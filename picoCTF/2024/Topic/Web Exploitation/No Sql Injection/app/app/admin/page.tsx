"use client";

import { useState } from "react";

interface Concept {
  id: number;
  name: string;
  description: string;
}

const concepts: Concept[] = [
  {
    id: 1,
    name: "Encryption",
    description:
      "Encryption is the process of converting information into a secure code to prevent unauthorized access.",
  },
  {
    id: 2,
    name: "Firewall",
    description:
      "A firewall is a network security device that monitors and filters incoming and outgoing network traffic.",
  },
  {
    id: 3,
    name: "Phishing",
    description:
      "Phishing is a cyber attack where an attacker pretends to be a trustworthy entity to trick victims into revealing sensitive information.",
  },
];

const AdminPage = () => {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  return (
    <div
      style={{
        color: "#475569",
        margin: "0 auto",
        padding: "1rem",
        backgroundColor: "#eaeaed",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "#475569",
        }}
      >
        Admin Page
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#475569",
            }}
          >
            Cybersecurity Concepts
          </h2>
          <ul style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            {concepts.map((concept) => (
              <li
                key={concept.id}
                style={{
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  color: "#475569",
                  fontWeight:
                    selectedConcept?.id === concept.id ? "bold" : "normal",
                  fontSize:
                    selectedConcept?.id === concept.id ? "1.5rem" : "inherit",
                }}
                onClick={() => setSelectedConcept(concept)}
              >
                {concept.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Concept Details */}
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              color: "#475569",
            }}
          >
            Concept Details
          </h2>
          {selectedConcept ? (
            <>
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  marginBottom: "0.25rem",
                  color: "#475569",
                }}
              >
                {selectedConcept.name}
              </h3>
              <p style={{ color: "#475569" }}>{selectedConcept.description}</p>
            </>
          ) : (
            <p style={{ fontStyle: "italic" }}>
              Select a concept to view details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
