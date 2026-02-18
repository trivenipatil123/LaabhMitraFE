import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const runtime = 'edge';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 50%, #065f46 100%)',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Subtle pattern overlay */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.06,
                        background:
                            'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)',
                    }}
                />

                {/* Logo */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                    }}
                >
                    <span style={{ fontSize: '56px' }}>🏛️</span>
                    <span
                        style={{
                            fontSize: '48px',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '-1px',
                        }}
                    >
                        LaabhMitra
                    </span>
                </div>

                {/* Tagline */}
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        color: '#d1fae5',
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.3,
                    }}
                >
                    Check Your Government Scheme
                </div>
                <div
                    style={{
                        fontSize: '32px',
                        fontWeight: 600,
                        color: '#fde68a',
                        textAlign: 'center',
                        marginTop: '4px',
                    }}
                >
                    Eligibility for Free
                </div>

                {/* Stats */}
                <div
                    style={{
                        display: 'flex',
                        gap: '40px',
                        marginTop: '40px',
                        color: '#a7f3d0',
                        fontSize: '18px',
                    }}
                >
                    <span>📋 700+ Schemes</span>
                    <span>💰 ₹25L+ Benefits</span>
                    <span>⚡ 2 min Check</span>
                    <span>🔒 100% Free</span>
                </div>

                {/* URL */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '28px',
                        fontSize: '20px',
                        color: '#6ee7b7',
                        fontWeight: 500,
                    }}
                >
                    laabhmitra.in
                </div>
            </div>
        ),
        { ...size }
    );
}
