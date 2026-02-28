import React from 'react'
import Chatbot from "./Chatbot";
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>SHOPIFY STORE</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">
        {children}
      </main>

      <Chatbot />

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout