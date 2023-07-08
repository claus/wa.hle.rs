import { NextResponse } from 'next/server';

export const config = {
    matcher: '/.well-known/atproto-did',
};

export function middleware() {
    return new NextResponse('did:plc:bhxyyizrcr5roe2w3zmd75np', {
        headers: { 'content-type': 'text/plain' },
        status: 200,
    });
}
