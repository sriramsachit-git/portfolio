export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'R', 'Scala', 'Java', 'C++', 'Shell Scripting', 'JavaScript'],
  },
  {
    category: 'ML Frameworks',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Keras', 'XGBoost', 'LightGBM', 'CatBoost', 'Hugging Face Transformers', 'fastai', 'PyTorch Lightning'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'Git', 'MLflow', 'Terraform', 'GitHub Actions', 'CI/CD', 'Jenkins', 'Prometheus', 'Grafana'],
  },
  {
    category: 'GenAI & LLMs',
    items: ['LangChain', 'OpenAI API', 'Anthropic API', 'RAG', 'LlamaIndex', 'ChromaDB', 'Pinecone', 'Weaviate', 'FAISS', 'vLLM', 'Ollama', 'Hugging Face'],
  },
  {
    category: 'Data Tools',
    items: ['Pandas', 'NumPy', 'Spark', 'Airflow', 'Dask', 'Ray', 'Polars', 'Great Expectations', 'DataBricks', 'PostgreSQL', 'MySQL', 'dbt'],
  },
  {
    category: 'Visualization',
    items: ['Plotly', 'Tableau', 'Matplotlib', 'Seaborn'],
  },
  {
    category: 'Domains',
    items: ['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'LLMs', 'MLOps', 'Generative AI', 'Time Series Forecasting', 'Recommendation Systems', 'Quantitative Finance'],
  },
];

/** Flat list for backward compat / word cloud */
export const skills = skillCategories.flatMap((c) =>
  c.items.map((name) => ({ name, level: 90 }))
);

export const experience = [
  {
    role: 'AI Engineer Intern',
    company: 'Vanvi Global Solutions',
    period: 'Aug 2024 – Present',
    highlights: [
      'Built an invoice processing automation system using Python and GPT-4 API to extract structured data from 500+ monthly invoices, reducing manual entry time by 60%.',
      'Developed a customer support chatbot with LangChain and RAG architecture, indexing 200+ FAQ documents and handling 70% of routine inquiries without human intervention.',
      'Created a sales analytics dashboard integrating Shopify and Google Sheets data via REST APIs for real-time KPI tracking.',
    ],
  },
  {
    role: 'Data Scientist',
    company: 'RK Financial Management Consultants',
    period: 'Jan 2022 – Dec 2023',
    highlights: [
      'Built automated SQL and Spark pipelines with cross-functional teams, reducing report generation time from 2 days to 4 hours and accelerating executive decision cycles by 60%.',
      'Designed 20+ interactive Plotly and Tableau dashboards tracking KPIs across sales, operations, and customer success, contributing to a 25% improvement in client retention.',
      'Developed time-series forecasting models (ARIMA, Prophet) and automated reporting for 50+ stakeholders, reducing manual effort by 15 hours/week.',
    ],
  },
];

export const education = [
  { degree: 'M.S. Data Science', school: 'Drexel University', year: '2024 – Present', gpa: '3.8' },
];
