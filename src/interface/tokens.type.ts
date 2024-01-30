import { JwtPayload } from 'src/interface/jwtPayload.type'

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };