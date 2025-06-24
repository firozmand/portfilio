import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="max-w-xl mx-auto py-24 text-center">
      <h2 className="text-lg text-green font-mono mb-4">04. What’s Next?</h2>
      <h3 className="text-5xl font-bold text-lightest-slate mb-4">
        Get In Touch
      </h3>
      <p className="text-slate mb-8">
        Although I’m not currently looking for any new opportunities, my inbox
        is always open. Whether you have a question or just want to say hi, I’ll
        try my best to get back to you!
      </p>
      <a
        href="mailto:firozmand.dev@gmail.com"
        className="inline-block mt-4 px-8 py-4 border border-green text-green rounded hover:bg-green/10 transition-colors text-lg"
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;
