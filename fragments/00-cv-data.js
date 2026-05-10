const CV_DATA = {
  meta: {
    languages: ["es", "en"],
    default_language: "es"
  },
  profile: {
    name: "Toni Wang",
    title: "Lead Data Engineer",
    location: {
      es: "Madrid, España (residencia: Molina de Segura, Murcia)",
      en: "Madrid, Spain (residence: Molina de Segura, Murcia)"
    },
    summary: {
      es: "Ingeniero informático apasionado por los datos, con +14 años de experiencia en business intelligence, big data y machine learning. He liderado proyectos de data analysis, integration, discovery y visualisation, construyendo data warehouses desde cero e integrando múltiples fuentes para convertir datos en producto.",
      en: "Software engineer passionate about data, with 14+ years of experience in business intelligence, big data and machine learning. I have led data analysis, integration, discovery and visualisation projects, building data warehouses from scratch and integrating multiple sources to turn data into product."
    },
    contact: {
      linkedin: "https://www.linkedin.com/in/tonywangchen",
      email: "tony.wang@um.es"
    },
    kpis: {
      years_experience: 14,
      companies: 9,
      projects: 9,
      technologies: 32
    }
  },
  experience: [
    {
      id: "exp-001",
      company: "Fever",
      role: "Lead Data Engineer",
      start: "2025-01",
      end: null,
      current: true,
      description: {
        es: "Liderazgo técnico y humano de un equipo de 8 Analytics Engineers, con foco en Partner Reporting y Finanzas. Alineo la estrategia de datos con departamentos clave de la compañía (Marketing, Finanzas y Operaciones).",
        en: "Technical and people leadership of an 8-person Analytics Engineering team, focused on Partner Reporting and Finance. I align the data strategy with key company departments (Marketing, Finance and Operations)."
      },
      impact: [
        {
          es: "Lidero un equipo de 8 Analytics Engineers, principalmente en las verticales de Partner Reporting y Finanzas",
          en: "I lead an 8-person Analytics Engineering team, mainly in the Partner Reporting and Finance verticals"
        },
        {
          es: "Supervisión y gestión del proceso de contrataciones y crecimiento del equipo",
          en: "Oversight and management of hiring and team growth"
        },
        {
          es: "Creación y mantenimiento de una fuente de datos única y real, eligiendo las tecnologías que mejor se adaptan a cada problema de negocio",
          en: "Creation and maintenance of a single source of truth, picking the best-fit technologies for each business problem"
        },
        {
          es: "Recolección y priorización de requisitos de Stakeholders para construir productos data-driven",
          en: "Collection and prioritisation of stakeholder requirements to build data-driven products"
        }
      ],
      stack: ["Snowflake", "Python", "Airflow", "dbt", "AWS", "Metabase", "Pandas", "Spark", "Fivetran"],
      projects: [
        {
          name: {
            es: "Evolución de la plataforma de datos corporativa",
            en: "Evolution of the corporate data platform"
          },
          description: {
            es: "Liderazgo de la evolución continua del data warehouse y la plataforma de datos de Fever, sirviendo a Marketing, Finanzas y Operaciones como única fuente de verdad.",
            en: "Leadership of the continuous evolution of Fever's data warehouse and data platform, serving Marketing, Finance and Operations as the single source of truth."
          },
          stack: ["Snowflake", "Python", "Airflow", "dbt", "AWS"],
          outcome: {
            es: "Plataforma consolidada como única fuente de verdad para los departamentos clave de la compañía",
            en: "Platform consolidated as the single source of truth for the company's key departments"
          }
        },
        {
          name: {
            es: "Modernización del stack de datos",
            en: "Data stack modernisation"
          },
          description: {
            es: "Modernización progresiva del stack: introducción de nuevas tecnologías de orquestación, transformación y calidad de datos para escalar el equipo y los casos de uso.",
            en: "Progressive stack modernisation: introduction of new orchestration, transformation and data quality technologies to scale the team and use cases."
          },
          stack: ["dbt", "Airflow", "Fivetran", "Snowflake"],
          outcome: {
            es: "Stack actualizado para soportar el crecimiento del equipo y la complejidad creciente de los casos de uso",
            en: "Updated stack to support team growth and the increasing complexity of use cases"
          }
        },
        {
          name: {
            es: "Productos de datos para stakeholders",
            en: "Data products for stakeholders"
          },
          description: {
            es: "Construcción de productos data-driven para Marketing, Finanzas y Operaciones: dashboards estratégicos, modelos de attribution y métricas de negocio en producción.",
            en: "Building data-driven products for Marketing, Finance and Operations: strategic dashboards, attribution models and production-grade business metrics."
          },
          stack: ["Snowflake", "Metabase", "Python"],
          outcome: {
            es: "Reporting estratégico productivo que sirve como base de decisión a Partner Reporting y Finanzas",
            en: "Production strategic reporting that serves as the decision basis for Partner Reporting and Finance"
          }
        }
      ]
    },
    {
      id: "exp-002",
      company: "Fever",
      role: "Senior Data Engineer",
      start: "2018-09",
      end: "2025-02",
      current: false,
      description: {
        es: "Análisis y desarrollo de un data warehouse desde cero (ingesta, modelado, transformaciones, capa de presentación y visualización), integrando múltiples fuentes de datos de marketing y producto.",
        en: "Analysis and development of a data warehouse from scratch (ingestion, modelling, transformations, presentation and visualisation layer), integrating multiple marketing and product data sources."
      },
      impact: [
        {
          es: "Construcción end-to-end del data warehouse de Fever en Snowflake desde cero",
          en: "End-to-end construction of Fever's Snowflake data warehouse from scratch"
        },
        {
          es: "Escala alcanzada: +50 fuentes integradas y +1.000 tablas productivas",
          en: "Scale reached: 50+ integrated sources and 1,000+ production tables"
        },
        {
          es: "Crecimiento del departamento de datos de 2 ingenieros a más de 30 personas",
          en: "Data department grew from 2 engineers to 30+ people"
        },
        {
          es: "Integración de fuentes clave: Google Analytics, Facebook, Mixpanel, Adwords, funnel.io",
          en: "Integration of key sources: Google Analytics, Facebook, Mixpanel, Adwords, funnel.io"
        }
      ],
      stack: ["Snowflake", "Python", "Pandas", "Spark", "Airflow", "Fivetran", "Metabase", "Microstrategy", "PostgreSQL", "AWS", "JQL", "funnel.io"],
      projects: [
        {
          name: {
            es: "Data Warehouse corporativo en Snowflake",
            en: "Corporate Data Warehouse on Snowflake"
          },
          description: {
            es: "Diseño, construcción y mantenimiento del data warehouse central de la compañía sobre Snowflake, sirviendo a Marketing, Producto y Finanzas.",
            en: "Design, build and maintenance of the company's central data warehouse on Snowflake, serving Marketing, Product and Finance."
          },
          stack: ["Snowflake", "Python", "Airflow", "Fivetran"],
          outcome: {
            es: "+1.000 tablas productivas; soporte al crecimiento del departamento de 2 a 30+ ingenieros de datos",
            en: "1,000+ production tables; support for the department's growth from 2 to 30+ data engineers"
          }
        },
        {
          name: {
            es: "Integración multi-fuente de marketing",
            en: "Multi-source marketing integration"
          },
          description: {
            es: "Ingesta y normalización de datos de plataformas (Google Analytics, Facebook, Mixpanel, Adwords) para análisis unificado de adquisición y conversión.",
            en: "Ingestion and normalisation of platform data (Google Analytics, Facebook, Mixpanel, Adwords) for unified acquisition and conversion analysis."
          },
          stack: ["funnel.io", "Fivetran", "Python", "Airflow"],
          outcome: {
            es: "+50 fuentes integradas en el data warehouse para análisis cross-canal",
            en: "50+ sources integrated into the data warehouse for cross-channel analysis"
          }
        }
      ]
    },
    {
      id: "exp-003",
      company: "Hawkers Group",
      role: "BI & Big Data Engineer",
      start: "2017-03",
      end: "2018-08",
      current: false,
      description: {
        es: "Análisis y desarrollo de un sistema nuevo de BI utilizando tecnologías Big Data, integrando múltiples fuentes vía API en un único data warehouse.",
        en: "Analysis and development of a new BI system using Big Data technologies, integrating multiple API sources into a single data warehouse."
      },
      impact: [
        {
          es: "Diseño e implementación de un stack Big Data sobre Cloudera (HDFS, Spark, Hive, Sqoop, Flume)",
          en: "Design and implementation of a Big Data stack on Cloudera (HDFS, Spark, Hive, Sqoop, Flume)"
        },
        {
          es: "Integración API de fuentes externas: Google Analytics, Facebook, Shopify",
          en: "API integration of external sources: Google Analytics, Facebook, Shopify"
        }
      ],
      stack: ["Apache Hadoop", "HDFS", "Spark", "Hive", "Sqoop", "Flume", "Cloudera", "PostgreSQL", "Scala", "Shell", "Pentaho", "Microstrategy"],
      projects: [
        {
          name: {
            es: "Plataforma BI Big Data e-commerce",
            en: "Big Data BI platform for e-commerce"
          },
          description: {
            es: "Construcción de un sistema de BI sobre stack Cloudera para alimentar reporting de e-commerce.",
            en: "Building a BI system on a Cloudera stack to feed e-commerce reporting."
          },
          stack: ["Hadoop", "Spark", "Hive", "Microstrategy"],
          outcome: {
            es: "Visión unificada de las distintas fuentes de venta online en un único data warehouse",
            en: "Unified view of the different online sales sources in a single data warehouse"
          }
        }
      ]
    },
    {
      id: "exp-004",
      company: "Tempe (Grupo Inditex)",
      role: {
        es: "Analista de Datos / Técnico BI",
        en: "Data Analyst / BI Technician"
      },
      start: "2016-06",
      end: "2017-02",
      current: false,
      description: {
        es: "Análisis inteligente de datos para la obtención de conocimiento accionable, resolución de incidencias en reporting y desarrollo de nuevos informes.",
        en: "Intelligent data analysis to extract actionable knowledge, reporting incident resolution and development of new reports."
      },
      impact: [
        {
          es: "Resolución de incidencias y mantenimiento del reporting corporativo",
          en: "Incident resolution and maintenance of corporate reporting"
        },
        {
          es: "Desarrollo de nuevos informes y modelos analíticos",
          en: "Development of new reports and analytical models"
        }
      ],
      stack: ["Microsoft SQL Server", "RStudio", "Microsoft Analysis Services", "Microsoft Reporting Services"],
      projects: []
    },
    {
      id: "exp-005",
      company: "Capgemini",
      role: "BI Consultant",
      start: "2015-10",
      end: "2017-02",
      current: false,
      description: {
        es: "Consultor Business Intelligence en el Centro de Excelencia BI de Murcia. Cliente principal: Gas Natural Fenosa.",
        en: "Business Intelligence consultant at the Murcia BI Center of Excellence. Main client: Gas Natural Fenosa."
      },
      impact: [
        {
          es: "Soporte y desarrollo de datamarts para Gas Natural Fenosa",
          en: "Support and development of datamarts for Gas Natural Fenosa"
        },
        {
          es: "Resolución de incidencias y mantenimiento evolutivo",
          en: "Incident resolution and evolutionary maintenance"
        },
        {
          es: "Desarrollo de proyectos ETL end-to-end hasta capa de reporting",
          en: "End-to-end ETL project development through to the reporting layer"
        }
      ],
      stack: ["PL/SQL", "Microstrategy", "Oracle SQL Developer"],
      projects: [
        {
          name: {
            es: "Mantenimiento y evolución de datamarts — Gas Natural Fenosa",
            en: "Datamart maintenance and evolution — Gas Natural Fenosa"
          },
          description: {
            es: "Diseño técnico y funcional de nuevos datamarts y desarrollo de proyectos ETL completos hasta reporting en Microstrategy.",
            en: "Technical and functional design of new datamarts and development of complete ETL projects through to Microstrategy reporting."
          },
          stack: ["PL/SQL", "Oracle SQL Developer", "Microstrategy"],
          outcome: {
            es: "Continuidad operativa de los datamarts del cliente y entrega de nuevos desarrollos end-to-end",
            en: "Operational continuity of the client's datamarts and delivery of new end-to-end developments"
          }
        }
      ]
    },
    {
      id: "exp-006",
      company: "Xepient Solutions",
      role: "Data Scientist",
      start: "2015-04",
      end: "2015-09",
      current: false,
      description: {
        es: "Análisis inteligente de datos y extracción de información y conocimiento a partir de grandes volúmenes de datos.",
        en: "Intelligent data analysis and extraction of information and knowledge from large data volumes."
      },
      impact: [
        {
          es: "Aplicación de técnicas de minería de datos para extracción de conocimiento de grandes volúmenes",
          en: "Application of data mining techniques to extract knowledge from large volumes"
        }
      ],
      stack: ["RStudio", "Weka", "Microsoft SQL Management Studio", "Kettle"],
      projects: []
    },
    {
      id: "exp-007",
      company: "Freelance",
      role: {
        es: "Desarrollador Web/Software",
        en: "Web/Software Developer"
      },
      start: "2014-04",
      end: "2015-09",
      current: false,
      description: {
        es: "Desarrollo de aplicaciones de escritorio, páginas web y módulos de automatización de trabajo para diversos clientes.",
        en: "Development of desktop applications, websites and work automation modules for various clients."
      },
      impact: [
        {
          es: "Entrega de proyectos a medida combinando frontend, backend y automatización",
          en: "Delivery of bespoke projects combining frontend, backend and automation"
        }
      ],
      stack: ["Java", "JavaScript", "PHP", "HTML", "CSS"],
      projects: []
    },
    {
      id: "exp-008",
      company: "STEL Solutions",
      role: {
        es: "Programador Web",
        en: "Web Developer"
      },
      start: "2013-02",
      end: "2013-10",
      current: false,
      description: {
        es: "Desarrollo web mediante CMS Joomla y desarrollo de comercios electrónicos con Prestashop.",
        en: "Web development with Joomla CMS and e-commerce development with Prestashop."
      },
      impact: [
        {
          es: "Diseño y desarrollo de la aplicación STEL Corner",
          en: "Design and development of the STEL Corner application"
        }
      ],
      stack: ["HTML", "PHP", "CSS", "JavaScript", "Joomla", "Prestashop"],
      projects: []
    },
    {
      id: "exp-009",
      company: "MetaEnlace Sistemas de Información",
      role: {
        es: "Prácticas Curriculares",
        en: "Curricular Internship"
      },
      start: "2012-06",
      end: "2012-07",
      current: false,
      description: {
        es: "Prácticas curriculares de la Universidad de Murcia: desarrollo de macros y plantillas de reporting.",
        en: "Curricular internship from the University of Murcia: development of macros and reporting templates."
      },
      impact: [
        {
          es: "Desarrollo de macros en VBA",
          en: "Development of VBA macros"
        },
        {
          es: "Generación de plantillas con JasperReport",
          en: "Generation of templates with JasperReport"
        }
      ],
      stack: ["VBA", "C#", "Java", "JasperReport"],
      projects: []
    }
  ],
  personal_projects: [
    {
      name: "CV Dashboard Builder",
      description: {
        es: "CV interactivo en formato analytical dashboard. Fichero HTML estático único con tema oscuro/claro, bilingüe ES/EN, timeline D3.js, skill matrix animada y exportación JSON. Desplegado en GitHub Pages.",
        en: "Interactive CV in analytical dashboard format. Single static HTML file with dark/light theme, bilingual ES/EN, D3.js timeline, animated skill matrix and JSON export. Deployed on GitHub Pages."
      },
      stack: ["HTML", "CSS", "Vanilla JS", "D3.js", "Claude Code"],
      url: "https://github.com/toniwang90/toniwangcv",
      year: "2025",
      status: "live"
    },
    {
      name: "[TODO]",
      description: {
        es: "[TODO] Descripción del proyecto",
        en: "[TODO] Project description"
      },
      stack: [],
      url: null,
      year: "[TODO]",
      status: null
    },
    {
      name: "[TODO]",
      description: {
        es: "[TODO] Descripción del proyecto",
        en: "[TODO] Project description"
      },
      stack: [],
      url: null,
      year: "[TODO]",
      status: null
    }
  ],
  skills: {
    data_engineering: [
      { name: "Apache Spark", level: 5, years: 9, category: "data_engineering" },
      { name: "Apache Airflow", level: 5, years: 6, category: "data_engineering" },
      { name: "Pandas", level: 5, years: 7, category: "data_engineering" },
      { name: "Apache Hadoop (HDFS/Hive/Sqoop)", level: 4, years: 2, category: "data_engineering" },
      { name: "Fivetran", level: 4, years: 5, category: "data_engineering" },
      { name: "Cloudera", level: 3, years: 2, category: "data_engineering" },
      { name: "Pentaho Data Integration", level: 3, years: 2, category: "data_engineering" }
    ],
    visualization: [
      { name: "Microstrategy", level: 5, years: 9, category: "visualization" },
      { name: "Metabase", level: 5, years: 7, category: "visualization" },
      { name: "Pentaho", level: 3, years: 2, category: "visualization" },
      { name: "MS Reporting Services", level: 3, years: 1, category: "visualization" },
      { name: "MS Analysis Services", level: 3, years: 1, category: "visualization" }
    ],
    cloud: [
      { name: "Snowflake", level: 5, years: 7, category: "cloud" },
      { name: "AWS", level: 4, years: 7, category: "cloud" }
    ],
    languages: [
      { name: "SQL", level: 5, years: 13, category: "languages" },
      { name: "PL/SQL", level: 4, years: 7, category: "languages" },
      { name: "Python", level: 5, years: 7, category: "languages" },
      { name: "Bash/Shell", level: 4, years: 9, category: "languages" },
      { name: "Java", level: 3, years: 4, category: "languages" },
      { name: "Scala", level: 3, years: 2, category: "languages" },
      { name: "JQL", level: 4, years: 5, category: "languages" },
      { name: "R", level: 3, years: 1, category: "languages" },
      { name: "JavaScript", level: 2, years: 2, category: "languages" }
    ],
    tools: [
      { name: "PostgreSQL", level: 5, years: 9, category: "tools" },
      { name: "Oracle SQL Developer", level: 4, years: 3, category: "tools" },
      { name: "Microsoft SQL Server", level: 3, years: 1, category: "tools" },
      { name: "Git/GitHub", level: 5, years: 11, category: "tools" },
      { name: "funnel.io", level: 4, years: 5, category: "tools" },
      { name: "RStudio", level: 3, years: 1, category: "tools" },
      { name: "Weka", level: 2, years: 1, category: "tools" },
      { name: "JIRA", level: 4, years: 7, category: "tools" }
    ]
  },
  education: [
    {
      institution: "Universidad de Murcia",
      degree: {
        es: "Máster Universitario",
        en: "Master's Degree"
      },
      field: {
        es: "Nuevas Tecnologías Informáticas (modalidad bilingüe en inglés)",
        en: "Computer Science New Technologies (bilingual English programme)"
      },
      start: "2014",
      end: "2015",
      highlights: []
    },
    {
      institution: "Universidad de Murcia",
      degree: {
        es: "Grado",
        en: "Bachelor's Degree"
      },
      field: {
        es: "Ingeniería Informática, Mención en Computación",
        en: "Computer Engineering, Specialisation in Computation"
      },
      start: "2009",
      end: "2014",
      highlights: []
    }
  ],
  certifications: [
    { name: "Oracle Database SQL Expert (1Z0-047)", issuer: "Oracle", year: "2015", url: null },
    { name: "Java SE 8 Programmer I (1Z0-803)", issuer: "Oracle", year: "2016", url: null },
    { name: "Oracle Database 11g Data Warehousing Certified Implementation Specialist (1Z0-515)", issuer: "Oracle", year: "2016", url: null }
  ],
  honors: [
    {
      name: {
        es: "Beca Santander de Prácticas en PYMES",
        en: "Santander Internship Grant for SMEs"
      },
      issuer: "Santander CRUE CEPYME",
      year: "2013"
    }
  ],
  languages: [
    {
      name: { es: "Español", en: "Spanish" },
      level: { es: "Nativo", en: "Native" }
    },
    {
      name: { es: "Chino mandarín (Wenzhou Wu)", en: "Mandarin Chinese (Wenzhou Wu)" },
      level: { es: "Nativo", en: "Native" }
    },
    {
      name: { es: "Chino mandarín (Qingtianhua)", en: "Mandarin Chinese (Qingtianhua)" },
      level: { es: "Nativo", en: "Native" }
    },
    {
      name: { es: "Inglés", en: "English" },
      level: { es: "Profesional (Working)", en: "Professional (Working)" }
    },
    {
      name: { es: "Chino mandarín (estándar)", en: "Mandarin Chinese (Standard)" },
      level: { es: "Elemental", en: "Elementary" }
    },
    {
      name: { es: "Francés", en: "French" },
      level: { es: "Elemental", en: "Elementary" }
    }
  ],
  ui: {
    nav: {
      summary:    { es: "Resumen",     en: "Summary" },
      experience: { es: "Experiencia", en: "Experience" },
      skills:     { es: "Skills",      en: "Skills" },
      projects:   { es: "Proyectos",   en: "Projects" },
      education:  { es: "Educación",   en: "Education" }
    },
    kpi: {
      years_experience: { es: "Años de experiencia", en: "Years of experience" },
      companies:        { es: "Empresas",            en: "Companies" },
      projects:         { es: "Proyectos",           en: "Projects" },
      technologies:     { es: "Tecnologías",         en: "Technologies" }
    },
    actions: {
      download:        { es: "Descargar JSON",  en: "Download JSON" },
      close:           { es: "Cerrar",        en: "Close" },
      toggle_theme:    { es: "Cambiar tema",  en: "Toggle theme" },
      toggle_language: { es: "EN",            en: "ES" },
      menu_open:       { es: "Abrir menú",    en: "Open menu" },
      menu_close:      { es: "Cerrar menú",   en: "Close menu" },
      view_in_experience: { es: "Ver en experiencia →", en: "View in experience →" },
      show_more:          { es: "Ver más",              en: "Show more" },
      show_less:          { es: "Ver menos",            en: "Show less" },
      view_project:       { es: "Ver proyecto →",       en: "View project →" }
    },
    timeline: {
      today:    { es: "Hoy",    en: "Today" },
      present:  { es: "actual", en: "present" },
      duration_year:   { es: "año",   en: "year" },
      duration_years:  { es: "años",  en: "years" },
      duration_month:  { es: "mes",   en: "month" },
      duration_months: { es: "meses", en: "months" }
    },
    skills: {
      categories: {
        data_engineering: { es: "Ingeniería de datos", en: "Data Engineering" },
        visualization:    { es: "Visualización",       en: "Visualization" },
        cloud:            { es: "Cloud",               en: "Cloud" },
        languages:        { es: "Lenguajes",           en: "Languages" },
        tools:            { es: "Herramientas",        en: "Tools" }
      },
      tooltip_format: {
        es: "{years} años · Nivel {level}/5",
        en: "{years} years · Level {level}/5"
      }
    },
    sections: {
      stack:          { es: "Stack técnico",   en: "Tech stack" },
      impact:         { es: "Impacto",         en: "Impact" },
      projects:       { es: "Proyectos",       en: "Projects" },
      certifications: { es: "Certificaciones", en: "Certifications" },
      languages:      { es: "Idiomas",         en: "Languages" },
      honors:         { es: "Reconocimientos", en: "Honors & Awards" },
      contact:        { es: "Contacto",        en: "Contact" }
    },
    months: {
      es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
  }
};

/**
 * Helper de internacionalización.
 *
 * Lee un valor que puede ser:
 *   - string plano  → se devuelve tal cual (ej. tech names, fechas, nombres propios)
 *   - { es, en }    → se devuelve la versión del idioma activo, con fallback a `es`
 *   - undefined/null → se devuelve "" para evitar "undefined" en pantalla
 *
 * Uso:
 *   t(CV_DATA.profile.summary)
 *   t(CV_DATA.ui.nav.experience)
 *   t(experience.role)
 */
function t(value, lang) {
  lang = lang || (typeof window !== "undefined" && window.__cvLang) || CV_DATA.meta.default_language;
  if (value == null) return "";
  if (typeof value === "object" && !Array.isArray(value) && (value.es !== undefined || value.en !== undefined)) {
    return value[lang] != null ? value[lang] : (value.es != null ? value.es : Object.values(value)[0]);
  }
  return value;
}
