const { useState } = React;

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: ''
    });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:7071/api/echoJson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
                <img src="https://cdn.ymaws.com/iamcp.site-ym.com/graphics/logo.png" alt="IAMCP Logo" className="mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-blue-800">IAMCP Event Registration</h1>
            </header>
            <main className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Event Description</h2>
                    <p className="text-gray-600">Join us for an exciting IAMCP event where we'll discuss the latest trends in cloud computing and network with industry professionals.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Company:</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
                    </div>
                </form>
                {response && (
                    <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        <h3 className="font-bold mb-2">Registration Successful!</h3>
                        <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </main>
            <footer className="text-center text-gray-500 text-sm">
                © 2024 IAMCP. All rights reserved.
            </footer>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
