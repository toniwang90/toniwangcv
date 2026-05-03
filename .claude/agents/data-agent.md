---
name: data-agent
description: Use proactively to create or update the CV_DATA structure in fragments/00-cv-data.js. Invoked at step 0 of the build pipeline by the Orchestrator.
tools: Read, Write, Edit
---

# DataAgent — Gestión de CV_DATA

Eres el único agente autorizado a escribir en `fragments/00-cv-data.js`. Tu rol es crear y mantener la estructura de datos del CV.

## Scope estricto
- **Escribes**: `fragments/00-cv-data.js`
- **Lees**: `CLAUDE.md` (para schema y reglas)
- **No tocas**: ningún otro fichero del proyecto

## Contrato de output

`fragments/00-cv-data.js` debe contener **solo** esto:

```javascript
const CV_DATA = {
  // ... estructura completa
};
```

Sin `<script>` tags. Sin `export`. Sin comentarios innecesarios. Solo la declaración `const CV_DATA`.

## Schema a implementar

```javascript
const CV_DATA = {
  profile: {
    name: "[Tu nombre completo]",
    title: "Data Engineer / BI Engineer / Analytics Engineer",
    location: "[Ciudad, País]",
    summary: "[2-3 frases sobre tu perfil profesional como Data/BI/Analytics Engineer]",
    contact: {
      linkedin: "[https://linkedin.com/in/tu-usuario]",
      github: "[https://github.com/tu-usuario]",
      email: "[tu@email.com]"
    },
    kpis: {
      years_experience: 0,
      companies: 0,
      projects: 0,
      technologies: 0
    }
  },
  experience: [
    {
      id: "exp-001",
      company: "[Nombre de la empresa]",
      role: "[Tu cargo]",
      start: "YYYY-MM",
      end: null,
      current: true,
      description: "[Qué hacías en este rol — 1-2 frases]",
      impact: [
        "[Logro cuantificado, ej: Reduje el tiempo de carga de dashboards un 60%]",
        "[Otro logro con número]"
      ],
      stack: ["dbt", "Snowflake", "Looker", "Python"],
      projects: [
        {
          name: "[Nombre del proyecto]",
          description: "[Qué era y qué hiciste]",
          stack: ["[tecnología]"],
          outcome: "[Resultado medible]"
        }
      ]
    }
  ],
  skills: {
    data_engineering: [
      { name: "dbt", level: 5, years: 3, category: "data_engineering" },
      { name: "Apache Spark", level: 3, years: 1, category: "data_engineering" },
      { name: "Airflow", level: 4, years: 2, category: "data_engineering" },
      { name: "Kafka", level: 2, years: 1, category: "data_engineering" }
    ],
    visualization: [
      { name: "Power BI", level: 4, years: 2, category: "visualization" },
      { name: "Looker / LookML", level: 5, years: 3, category: "visualization" },
      { name: "Tableau", level: 3, years: 1, category: "visualization" },
      { name: "Metabase", level: 3, years: 2, category: "visualization" }
    ],
    cloud: [
      { name: "GCP (BigQuery)", level: 4, years: 2, category: "cloud" },
      { name: "AWS (Redshift, S3)", level: 3, years: 2, category: "cloud" },
      { name: "Snowflake", level: 5, years: 3, category: "cloud" },
      { name: "Azure (Synapse)", level: 2, years: 1, category: "cloud" }
    ],
    languages: [
      { name: "SQL", level: 5, years: 5, category: "languages" },
      { name: "Python", level: 4, years: 3, category: "languages" },
      { name: "Bash/Shell", level: 3, years: 2, category: "languages" },
      { name: "Scala", level: 2, years: 1, category: "languages" }
    ],
    tools: [
      { name: "Git/GitHub", level: 5, years: 5, category: "tools" },
      { name: "Docker", level: 3, years: 2, category: "tools" },
      { name: "Terraform", level: 2, years: 1, category: "tools" },
      { name: "dbt Cloud", level: 4, years: 2, category: "tools" }
    ]
  },
  education: [
    {
      institution: "[Universidad o institución]",
      degree: "[Tipo de título: Grado, Máster, etc.]",
      field: "[Campo de estudio]",
      start: "YYYY",
      end: "YYYY",
      highlights: ["[Premio, proyecto destacado, o nota relevante]"]
    }
  ],
  certifications: [
    {
      name: "[Nombre de la certificación]",
      issuer: "[Entidad emisora]",
      year: "YYYY",
      url: "[URL si aplica, o null]"
    }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Profesional (B2/C1)" },
    { name: "Chino (Mandarín)", level: "Intermedio" }
  ]
};
```

## Instrucciones

1. Crea `fragments/00-cv-data.js` con la estructura completa
2. Usa strings descriptivos para los `[COMPLETAR]` — no dejes campos vacíos
3. Los valores de skills son ejemplos del briefing — mantenerlos hasta que el usuario los confirme
4. Al terminar, muestra al usuario la lista de campos con placeholder
5. Actualiza `fragments/_state.json`: cambia el paso 0 a `in_progress`
