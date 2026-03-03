import React from "react";
import Heading from "./common/Heading";
import { fadeUpItem, staggerContainer } from "../utils/motionVariants";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const About = () => {
  const descriptions = [
    {
      sentence:
        "I’m an Associate Software Engineer building scalable, production-ready full-stack applications using .NET and Microsoft Azure. I have hands-on experience with CI/CD, automation, and cloud deployments through Azure DevOps.",
    },
    {
      sentence:
        "I also specialize in Generative AI and Agentic systems, developing RAG-based solutions and AI agents using Azure OpenAI, Azure AI Search, and Azure AI Foundry. I’m passionate about combining cloud engineering and AI to deliver intelligent, enterprise-grade solutions.",
    },
  ];
  return (
    <section className="max-w-4xl mx-auto p-4 border-b border-border-default">
      <Heading size="md" weight="md" className="mb-4">
        About
      </Heading>

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="space-y-4"
      >
        {descriptions.map((description, index) => (
          <motion.div
            key={index}
            variants={fadeUpItem(10)}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex gap-3"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-border-default shrink-0" />
            <p className="text-text-secondary text-sm leading-relaxed max-w-3xl">
              {description.sentence}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
