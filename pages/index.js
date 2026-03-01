import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { useRouter } from "next/router";

const Home = ({ products, bannerData, isAuthenticated }) => {
  const router = useRouter();

  /* ===========================
     🔐 LANDING SCREEN (NOT LOGGED IN)
  ============================ */
  if (!isAuthenticated) {
    return (
      <div style={styles.authContainer}>
        <h1 style={styles.title}>Welcome to SHOPIFY</h1>
        <p style={styles.subtitle}>
          Discover premium speakers & top tech products
        </p>

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  /* ===========================
     ✅ DASHBOARD (LOGGED IN)
  ============================ */
  return (
    <div className="Appp">

      {/* 🔝 Navbar with Logout */}
      <div style={styles.navbar}>
        <h3 style={{ margin: 0 }}>Dashboard</h3>

        <button
          style={styles.logoutBtn}
          onClick={async () => {
            await fetch("/api/users/logout");
            router.reload();
          }}
        >
          Logout
        </button>
      </div>

      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

/* ===========================
   🔐 SERVER SIDE AUTH CHECK
=========================== */
export const getServerSideProps = async (context) => {
  const { req } = context;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.accessToken;

  let isAuthenticated = false;

  if (token) {
    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      isAuthenticated = true;
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // 🚫 Not logged in → no need to fetch products
  if (!isAuthenticated) {
    return {
      props: {
        products: [],
        bannerData: [],
        isAuthenticated: false,
      },
    };
  }

  // ✅ Logged in → fetch data
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
      isAuthenticated: true,
    },
  };
};

export default Home;

/* ===========================
   🎨 STYLES
=========================== */

const styles = {
  authContainer: {
    height: "100vh",
    background: "#0f172a",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    marginBottom: "40px",
    opacity: 0.8,
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
  },
  primaryBtn: {
    padding: "12px 35px",
    fontSize: "16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px 35px",
    fontSize: "16px",
    background: "transparent",
    color: "white",
    border: "1px solid white",
    borderRadius: "8px",
    cursor: "pointer",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "#0f172a",
    color: "white",
  },
  logoutBtn: {
    padding: "8px 20px",
    background: "#ef4444",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};