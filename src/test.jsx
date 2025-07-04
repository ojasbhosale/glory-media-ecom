import React from 'react'

export const test = () => {
  return (
    <div>
        <nav>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>  
        </nav>
        <main>
            <h1>Welcome to the Test Page</h1>
            <p>This is a simple test page to check the layout.</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Support will be provided soon as we develop the app
            </button>


            
        </main>
    </div>
  )
}
