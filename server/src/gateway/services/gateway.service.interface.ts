export interface IGatewayService {
    processMessage(payload: {
        message: string;
        username: string;
    }): Promise<void>
}