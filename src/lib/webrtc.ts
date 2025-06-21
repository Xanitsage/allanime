// src/lib/webrtc.ts
// Placeholder for Watch2gether WebRTC logic
// Use this as a starting point for signaling and peer connection

export function createPeerConnection(): RTCPeerConnection {
  const config = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
    ],
  };
  return new RTCPeerConnection(config);
}
