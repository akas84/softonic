import { IncomingMessage, ServerResponse } from "http";
import { Http2ServerRequest, Http2ServerResponse } from "http2";



export class GetAllController {

    request: IncomingMessage|Http2ServerRequest;
    response: ServerResponse|Http2ServerResponse;

    constructor(
        request: IncomingMessage|Http2ServerRequest,
        response: ServerResponse|Http2ServerResponse,
    ) {
        this.request = request;
        this.response = response;
    }

    execute() {

    }
}
