import { useState } from "react";
import Swal from "sweetalert2";




const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your response has been saved",
            showConfirmButton: false,
            timer: 1500
          });

        // Add your form submission logic here

        // Reset the form fields
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-gray-800 text-white text-center py-4">
                <h1 className="text-2xl font-bold">Contact Us</h1>
            </header>

            <section className="max-w-3xl mx-auto bg-white shadow-md my-8 p-8">
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 md:pr-8">
                        <form className="mb-6" onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                                placeholder="Your Name"
                            />

                            <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                                placeholder="Your Email"
                            />

                            <label htmlFor="message" className="block mt-4 text-sm font-medium text-gray-700">
                                Message:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                className="mt-1 p-2 border rounded-md w-full"
                                placeholder="Your Message"
                            ></textarea>

                            <button
                                type="submit"
                                className="mt-4 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="md:w-1/2 md:pl-8">
                        <div className="text-center">
                            <p className="mb-4">For any inquiries, please contact us at:</p>
                            <p>Email: info@example.com</p>
                            <p>Phone: +1 (123) 456-7890</p>
                        </div>

                        <img
                            src="https://i.ibb.co/59ynkK8/Pngtree-contact-us-flat-design-style-5874427.png"
                            alt="Contact Image"
                            className="mt-8 w-full h-auto rounded-md"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;


