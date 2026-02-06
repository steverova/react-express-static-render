import path from 'node:path'

import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {
	type NextFunction,
	type Request,
	type Response
} from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import greetings from '../../_shared/shared'
import type {
	ApiResponse,
	EchoResponse,
	HealthResponse
} from './types/shared.types'

dotenv.config()

const app: express.Application = express()

app.use(helmet())
app.use(cors())
app.use(compression())
app.use(morgan('dev'))

// Rate limiting
const limiter: ReturnType<typeof rateLimit> = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
	express.static(path.join(process.cwd(), 'dist/client'), {
		maxAge: '1d',
		etag: false
	})
)

app.get('/api', (_: Request, res: Response<ApiResponse<string>>) => {
	const greeting = greetings('steven')

	res.json({ message: `${greeting}, greeting from API` })
})

app.get('/api/health', (_: Request, res: Response<HealthResponse>) => {
	res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.post('/api/echo', (req: Request, res: Response<EchoResponse>) => {
	res.json({ received: req.body })
})

app.use((_: Request, res: Response) => {
	res.sendFile(
		path.join(process.cwd(), 'dist/client', 'index.html'),
		(err: NodeJS.ErrnoException | null) => {
			if (err) {
				console.error('Error serving index.html:', err)
				res.status(500).send('Internal Server Error')
			}
		}
	)
})

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
	console.error('Error:', err)
	res.status(500).json({ error: 'Internal Server Error' })
})

export default app
