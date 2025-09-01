import { ImageResponse } from 'next/og';
 
// Route segment config
export const runtime = 'edge';
 
// Image metadata
export const alt = 'Lasantha Kulasooriya - AI Engineer & Data Scientist';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';
 
// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1e1e27 50%, #0f0f14 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(6, 182, 212, 0.2) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 1,
            padding: '60px',
          }}
        >
          {/* Name */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              margin: '0 0 20px 0',
              textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
            }}
          >
            Lasantha Kulasooriya
          </h1>
          
          {/* Title */}
          <p
            style={{
              fontSize: '36px',
              color: '#f8fafc',
              margin: '0 0 30px 0',
              fontWeight: '600',
            }}
          >
            AI Engineer & Data Scientist
          </p>
          
          {/* Subtitle */}
          <p
            style={{
              fontSize: '24px',
              color: '#cbd5e1',
              margin: '0 0 40px 0',
              maxWidth: '800px',
              lineHeight: '1.4',
            }}
          >
            Transforming AI research into real-world applications
          </p>
          
          {/* Tech Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {['Machine Learning', 'Computer Vision', 'NLP', 'Deep Learning'].map((tech, index) => (
              <span
                key={tech}
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  color: '#06b6d4',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '18px',
                  fontWeight: '500',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Bottom Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: '#64748b',
            }}
          >
            lk-ai.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}