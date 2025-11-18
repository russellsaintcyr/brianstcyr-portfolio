'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    clarity: any
  }
}

export default function ClarityScript() {
  useEffect(() => {
    const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

    if (!clarityProjectId) {
      console.warn('Clarity project ID not found')
      return
    }

    // Load Clarity script
    const script = document.createElement('script')
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityProjectId}");
    `
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}