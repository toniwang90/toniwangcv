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
      email: "tony.wang@um.es",
      github: "https://github.com/toniwang90",
      links: [
        /* Add extra links here: { icon: "globe"|"twitter"|"portfolio"|..., label: "...", url: "..." } */
      ]
    },
    kpis: {
      years_experience: 14,
      companies: 7,
      projects: 8,
      technologies: 36
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
      stack: ["Snowflake", "BigQuery", "Python", "Airflow", "dbt", "AWS", "Metabase", "Fivetran", "funnel.io", "Kubernetes", "Docker", "Datadog", "Claude Code", "Cursor", "CDC"],
      projects: [
        {
          name: {
            es: "Partner Reporting: dashboards, reportes y APIs de datos",
            en: "Partner Reporting: dashboards, reports and data APIs"
          },
          description: {
            es: "Diseño y entrega de dashboards, reportes automatizados y APIs para que los partners de Fever accedan y exploten su propio dato directamente.",
            en: "Design and delivery of dashboards, automated reports and APIs so that Fever's partners can access and exploit their own data directly."
          },
          stack: ["Snowflake", "BigQuery", "dbt", "Python", "Metabase"],
          outcome: {
            es: "Servicio de datos self-service para partners de Fever a escala",
            en: "Self-service data service for Fever's partners at scale"
          }
        },
        {
          name: {
            es: "Plataforma de IA para datos: capa semántica y bases de conocimiento",
            en: "AI-powered data platform: semantic layer and knowledge bases"
          },
          description: {
            es: "Aplicación de IA generativa para construir una capa semántica sobre el data warehouse, bases de conocimiento internas y aplicaciones data-driven con programación agéntica.",
            en: "Application of generative AI to build a semantic layer over the data warehouse, internal knowledge bases and data-driven applications using agentic programming."
          },
          stack: ["Python", "Claude Code", "Cursor", "Snowflake", "dbt"],
          outcome: {
            es: "Incremento de productividad del equipo y nuevos productos de datos impulsados por IA",
            en: "Team productivity increase and new AI-driven data products"
          }
        },
        {
          name: {
            es: "Optimización de costes: integraciones in-house y Snowflake",
            en: "Cost optimisation: in-house integrations and Snowflake"
          },
          description: {
            es: "Migración de integraciones de terceros a desarrollos propios y optimización del cómputo en Snowflake asistida por IA para reducir costes operativos.",
            en: "Migration from third-party integrations to in-house builds and AI-assisted Snowflake compute optimisation to reduce operational costs."
          },
          stack: ["Snowflake", "Python", "Airflow", "Datadog"],
          outcome: {
            es: "Reducción de costes operativos y mayor control sobre las integraciones de datos",
            en: "Reduction of operational costs and greater control over data integrations"
          }
        }
      ]
    },
    {
      id: "exp-002",
      company: "Fever",
      role: "Senior Data Engineer",
      start: "2018-09",
      end: "2025-01",
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
      stack: ["Snowflake", "AWS Aurora", "Python", "Pandas", "Spark", "Airflow", "dbt", "Fivetran", "funnel.io", "Metabase", "Microstrategy", "PostgreSQL", "AWS", "CDC"],
      projects: [
        {
          name: {
            es: "Construcción del Data Warehouse desde cero: Aurora → Snowflake",
            en: "Data Warehouse built from scratch: Aurora → Snowflake"
          },
          description: {
            es: "Diseño e implementación de un data warehouse corporativo sobre AWS Aurora, con posterior migración completa a Snowflake. Arquitectura medallion (bronze/silver/gold) para ingesta, transformación y servicio del dato. 50+ fuentes integradas: marketing (Google Analytics, Facebook, Mixpanel, Adwords), pagos (Stripe, Adyen, Braintree, Square), producto (JIRA, YouTube) y más.",
            en: "Design and implementation of a corporate data warehouse on AWS Aurora, with full subsequent migration to Snowflake. Medallion architecture (bronze/silver/gold) for ingestion, transformation and data serving. 50+ integrated sources: marketing (Google Analytics, Facebook, Mixpanel, Adwords), payments (Stripe, Adyen, Braintree, Square), product (JIRA, YouTube) and more."
          },
          stack: ["Snowflake", "AWS Aurora", "Python", "Airflow", "Fivetran", "funnel.io", "dbt"],
          outcome: {
            es: "+1.000 tablas productivas; equipo de datos de 2 a 30+ personas",
            en: "1,000+ production tables; data team grew from 2 to 30+ people"
          }
        },
        {
          name: {
            es: "Modelos de atribución y funnel de compras",
            en: "Attribution models and purchase funnel"
          },
          description: {
            es: "Construcción de modelos de atribución de compras y análisis del funnel de conversión end-to-end, unificando fuentes de marketing, producto y pagos para entender el recorrido del usuario.",
            en: "Building purchase attribution models and end-to-end conversion funnel analysis, unifying marketing, product and payment sources to understand the user journey."
          },
          stack: ["Snowflake", "Python", "dbt", "Metabase"],
          outcome: {
            es: "Visibilidad completa del funnel de compra para Marketing y Producto",
            en: "Full purchase funnel visibility for Marketing and Product"
          }
        },
        {
          name: {
            es: "Optimización de marketing y cuadre financiero",
            en: "Marketing optimisation and financial reconciliation"
          },
          description: {
            es: "Modelos de datos para optimización del gasto en marketing y cuadre financiero automatizado, integrando pasarelas de pago (Stripe, Adyen, Braintree, Square) con el data warehouse.",
            en: "Data models for marketing spend optimisation and automated financial reconciliation, integrating payment gateways (Stripe, Adyen, Braintree, Square) with the data warehouse."
          },
          stack: ["Snowflake", "Python", "dbt", "Airflow", "Fivetran"],
          outcome: {
            es: "Automatización del cuadre financiero y reporting de marketing unificado",
            en: "Automated financial reconciliation and unified marketing reporting"
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
          es: "Construcción desde cero de la primera plataforma de datos de la empresa sobre Cloudera (HDFS, Spark, Hive, Sqoop, Flume)",
          en: "Built the company's first data platform from scratch on Cloudera (HDFS, Spark, Hive, Sqoop, Flume)"
        },
        {
          es: "Integración API de fuentes externas: Google Analytics, Facebook Ads, Google Adwords, Shopify",
          en: "API integration of external sources: Google Analytics, Facebook Ads, Google Adwords, Shopify"
        },
        {
          es: "Habilitación de métricas de negocio clave (ROAS, CAC) cruzando datos de múltiples plataformas por primera vez",
          en: "Enabled key business metrics (ROAS, CAC) by cross-referencing data from multiple platforms for the first time"
        }
      ],
      stack: ["Apache Hadoop", "HDFS", "Spark", "Hive", "Sqoop", "Flume", "Cloudera", "Scala", "Shell", "PostgreSQL", "Pentaho", "Microstrategy"],
      projects: [
        {
          name: {
            es: "Primera plataforma de datos de Hawkers: BI e-commerce desde cero",
            en: "Hawkers' first data platform: e-commerce BI from scratch"
          },
          description: {
            es: "Diseño y construcción íntegra del primer sistema de datos de Hawkers sobre stack Cloudera, programado en Scala. Integración de Google Analytics, Facebook Ads, Adwords y Shopify para alimentar reporting interno de management: forecasting, análisis de ventas, atribución y métricas de marketing (ROAS, CAC).",
            en: "Full design and build of Hawkers' first data system on a Cloudera stack, programmed in Scala. Integration of Google Analytics, Facebook Ads, Adwords and Shopify to feed management's internal reporting: forecasting, sales analysis, attribution and marketing metrics (ROAS, CAC)."
          },
          stack: ["Cloudera", "Spark", "Hive", "Scala", "Microstrategy"],
          outcome: {
            es: "Primera fuente de verdad única para management, permitiendo decisiones basadas en dato cross-canal",
            en: "Company's first single source of truth for management, enabling cross-channel data-driven decisions"
          }
        }
      ]
    },
    {
      id: "exp-004",
      company: "Capgemini",
      client: "Tempe (Grupo Inditex)",
      role: {
        es: "Consultor BI / Analista de Datos",
        en: "BI Consultant / Data Analyst"
      },
      start: "2016-06",
      end: "2017-02",
      current: false,
      description: {
        es: "Consultor BI en Capgemini, destinado en el cliente Tempe (Grupo Inditex). Análisis inteligente de datos para la obtención de conocimiento accionable, resolución de incidencias en reporting y desarrollo de nuevos informes.",
        en: "BI Consultant at Capgemini, assigned to client Tempe (Grupo Inditex). Intelligent data analysis to extract actionable knowledge, reporting incident resolution and development of new reports."
      },
      impact: [
        {
          es: "Análisis de correlaciones entre productos para generar recomendaciones de compra cruzada en la web",
          en: "Analysis of product purchase correlations to generate cross-sell recommendations on the website"
        },
        {
          es: "Creación de cubos OLAP y reporting de ventas para el área comercial",
          en: "Creation of OLAP cubes and sales reporting for the commercial area"
        },
        {
          es: "Mantenimiento y evolución del reporting corporativo de Tempe (Grupo Inditex)",
          en: "Maintenance and evolution of Tempe's (Grupo Inditex) corporate reporting"
        }
      ],
      stack: ["Microsoft SQL Server", "Microsoft Analysis Services", "Microsoft Reporting Services", "RStudio", "Excel"],
      projects: [
        {
          name: {
            es: "Análisis de correlaciones de compra para recomendaciones de producto",
            en: "Purchase correlation analysis for product recommendations"
          },
          description: {
            es: "Análisis estadístico de patrones de compra para detectar correlaciones entre prendas y generar recomendaciones de venta cruzada en la web de Tempe.",
            en: "Statistical analysis of purchase patterns to detect correlations between garments and generate cross-sell recommendations on the Tempe website."
          },
          stack: ["RStudio", "Microsoft SQL Server"],
          outcome: {
            es: "Identificación de patrones de compra cruzada para su aplicación en la web de e-commerce",
            en: "Cross-purchase pattern identification for application on the e-commerce website"
          }
        }
      ]
    },
    {
      id: "exp-005",
      company: "Capgemini",
      client: "Gas Natural Fenosa",
      role: "BI Consultant",
      start: "2015-10",
      end: "2016-06",
      current: false,
      description: {
        es: "Consultor Business Intelligence en el Centro de Excelencia BI de Capgemini en Murcia, destinado en el cliente Gas Natural Fenosa.",
        en: "Business Intelligence consultant at Capgemini's Murcia BI Centre of Excellence, assigned to client Gas Natural Fenosa."
      },
      impact: [
        {
          es: "Desarrollo end-to-end de un datamart nuevo desde cero: extracción, transformación con el sistema ETL in-house y modelado completo en Microstrategy",
          en: "End-to-end development of a new datamart from scratch: extraction, transformation with the in-house ETL system and full modelling in Microstrategy"
        },
        {
          es: "Mantenimiento evolutivo y resolución de incidencias en los datamarts existentes del cliente",
          en: "Evolutionary maintenance and incident resolution on the client's existing datamarts"
        }
      ],
      stack: ["Oracle Database", "PL/SQL", "Oracle SQL Developer", "Microstrategy", "Excel"],
      projects: [
        {
          name: {
            es: "Nuevo datamart end-to-end — Gas Natural Fenosa",
            en: "New end-to-end datamart — Gas Natural Fenosa"
          },
          description: {
            es: "Diseño y construcción completa de un datamart inexistente: extracción del dato de origen, transformaciones SQL mediante el sistema ETL in-house de Capgemini, modelado dimensional en Oracle y capa de reporting íntegra en Microstrategy.",
            en: "Full design and build of a previously non-existent datamart: source data extraction, SQL transformations via Capgemini's in-house ETL system, dimensional modelling in Oracle and full reporting layer in Microstrategy."
          },
          stack: ["Oracle Database", "PL/SQL", "Microstrategy"],
          outcome: {
            es: "Datamart nuevo en producción, entregado end-to-end desde la ingesta hasta el reporting",
            en: "New datamart in production, delivered end-to-end from ingestion to reporting"
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
          es: "Análisis del comportamiento de usuarios en web: rutas de navegación, clicks y mapas de calor para optimización del funnel de ventas",
          en: "Web user behaviour analysis: navigation paths, clicks and heatmaps for sales funnel optimisation"
        },
        {
          es: "Desarrollo de un algoritmo propio de análisis de correlaciones y caminos de usuario, antes de que existieran herramientas comerciales para ello",
          en: "Development of a custom user path and correlation algorithm, before commercial tools existed for this purpose"
        }
      ],
      stack: ["RStudio", "Weka", "Microsoft SQL Server", "Kettle"],
      projects: [
        {
          name: {
            es: "Algoritmo de análisis de funnel y rutas de usuario",
            en: "User funnel and path analysis algorithm"
          },
          description: {
            es: "Construcción de un algoritmo propio para detectar correlaciones y rutas habituales de navegación en e-commerce, con visualización de mapas de calor. La extracción se realizaba con Kettle, el modelado con R y Weka.",
            en: "Building a custom algorithm to detect correlations and common navigation paths in e-commerce, with heatmap visualisation. Data extraction via Kettle, modelling with R and Weka."
          },
          stack: ["RStudio", "Weka", "Kettle", "Microsoft SQL Server"],
          outcome: {
            es: "Identificación de rutas de conversión y puntos de abandono del funnel para el equipo de marketing",
            en: "Identification of conversion paths and funnel drop-off points for the marketing team"
          }
        }
      ]
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
          es: "Entrega de webs corporativas y software a medida para clientes locales",
          en: "Delivery of corporate websites and bespoke software for local clients"
        }
      ],
      stack: ["Java", "Joomla", "PHP", "JavaScript", "HTML", "CSS"],
      projects: [
        {
          name: {
            es: "Software de registro de paquetes entre tiendas",
            en: "Inter-store package tracking software"
          },
          description: {
            es: "Aplicación de escritorio en Java para un negocio local: permitía escanear paquetes en una tienda y confirmar la recepción en otra, manteniendo concordancia del inventario en tránsito entre locales.",
            en: "Java desktop application for a local business: allowed scanning packages at one store and confirming receipt at another, keeping track of inventory in transit between locations."
          },
          stack: ["Java"],
          outcome: {
            es: "Eliminación del seguimiento manual de paquetes entre tiendas del cliente",
            en: "Elimination of manual package tracking between the client's stores"
          }
        },
        {
          name: {
            es: "Webs corporativas: AMPA IES Juan Carlos I y Congreso SESBE 2015",
            en: "Corporate websites: AMPA IES Juan Carlos I and SESBE 2015 Congress"
          },
          description: {
            es: "Desarrollo de la web del AMPA del IES Juan Carlos I de Murcia y del sitio web oficial del Congreso SESBE 2015, ambas sobre Joomla.",
            en: "Development of the AMPA website for IES Juan Carlos I (Murcia) and the official website for the SESBE 2015 Congress, both on Joomla."
          },
          stack: ["Joomla", "PHP", "HTML", "CSS", "JavaScript"],
          outcome: {
            es: "Presencia web operativa para ambas organizaciones",
            en: "Operational web presence for both organisations"
          }
        }
      ]
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
          es: "Colaboración en el desarrollo de STEL Corner, gestor de inventario para PYMES",
          en: "Contributed to the development of STEL Corner, an inventory management tool for SMEs"
        },
        {
          es: "Desarrollo autónomo de webs corporativas para clientes locales (Dulceplus, Dominios del Aire, Pimentón El Águila)",
          en: "Autonomous development of corporate websites for local clients (Dulceplus, Dominios del Aire, Pimentón El Águila)"
        }
      ],
      stack: ["HTML", "PHP", "CSS", "JavaScript", "Joomla", "Prestashop"],
      projects: [
        {
          name: {
            es: "STEL Corner — gestor de inventario para PYMES",
            en: "STEL Corner — SME inventory manager"
          },
          description: {
            es: "Colaboración en el desarrollo de STEL Corner, una aplicación web de gestión de inventario orientada a pequeñas y medianas empresas.",
            en: "Contributed to the development of STEL Corner, a web-based inventory management application aimed at small and medium-sized businesses."
          },
          stack: ["PHP", "JavaScript", "HTML", "CSS"],
          outcome: {
            es: "Producto de gestión de inventario web en producción para PYMES",
            en: "Web-based inventory management product in production for SMEs"
          }
        },
        {
          name: {
            es: "Webs corporativas para clientes locales",
            en: "Corporate websites for local clients"
          },
          description: {
            es: "Desarrollo independiente de webs sencillas sobre Joomla para clientes locales: Dulceplus, Dominios del Aire y Pimentón El Águila.",
            en: "Independent development of simple Joomla-based websites for local clients: Dulceplus, Dominios del Aire and Pimentón El Águila."
          },
          stack: ["Joomla", "PHP", "HTML", "CSS"],
          outcome: {
            es: "Presencia web operativa para tres negocios locales",
            en: "Operational web presence for three local businesses"
          }
        }
      ]
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
          es: "Desarrollo de macros VBA sobre Excel para automatizar reporting interno de la empresa",
          en: "Development of VBA macros on Excel to automate the company's internal reporting"
        },
        {
          es: "Generación de plantillas de informes con JasperReport",
          en: "Generation of report templates with JasperReport"
        }
      ],
      stack: ["VBA", "Excel", "JasperReport", "PL/SQL", "Java", "C#"],
      projects: []
    }
  ],
  personal_projects: [
    {
      name: "CV Dashboard Builder",
      description: {
        es: "CV interactivo en formato analytical dashboard, construido íntegramente con IA mediante programación agéntica con Claude Code. Fichero HTML estático único con tema oscuro/claro, bilingüe ES/EN, timeline D3.js, skill matrix animada y exportación JSON. Desplegado en GitHub Pages.",
        en: "Interactive CV in analytical dashboard format, built entirely with AI using agentic programming with Claude Code. Single static HTML file with dark/light theme, bilingual ES/EN, D3.js timeline, animated skill matrix and JSON export. Deployed on GitHub Pages."
      },
      stack: ["HTML", "CSS", "Vanilla JS", "D3.js", "Claude Code", "Agentic AI"],
      url: "https://github.com/toniwang90/toniwangcv",
      year: "2026",
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
      { name: "funnel.io",                 level: 5, years: 5, category: "data_engineering" },
      { name: "Apache Airflow",            level: 4, years: 6, category: "data_engineering" },
      { name: "dbt",                       level: 4, years: 4, category: "data_engineering" },
      { name: "Fivetran",                  level: 4, years: 5, category: "data_engineering" },
      { name: "CDC (Change Data Capture)", level: 4, years: 4, category: "data_engineering" },
      { name: "Pandas",                    level: 3, years: 7, category: "data_engineering" },
      { name: "Apache Spark",              level: 2, years: 4, category: "data_engineering" },
      { name: "Apache Hadoop (HDFS/Hive)", level: 2, years: 2, category: "data_engineering" },
      { name: "Cloudera",                  level: 2, years: 2, category: "data_engineering" }
    ],
    sql_databases: [
      { name: "Snowflake",            level: 5, years: 7, category: "sql_databases" },
      { name: "PostgreSQL",           level: 5, years: 9, category: "sql_databases" },
      { name: "PL/SQL",               level: 4, years: 7, category: "sql_databases" },
      { name: "BigQuery",             level: 3, years: 1, category: "sql_databases" },
      { name: "Oracle SQL Developer", level: 3, years: 3, category: "sql_databases" },
      { name: "Microsoft SQL Server", level: 3, years: 1, category: "sql_databases" }
    ],
    languages: [
      { name: "Python",     level: 4, years: 7, category: "languages" },
      { name: "Bash/Shell", level: 4, years: 9, category: "languages" },
      { name: "Scala",      level: 3, years: 2, category: "languages" },
      { name: "R",          level: 3, years: 1, category: "languages" },
      { name: "Java",       level: 2, years: 4, category: "languages" }
    ],
    visualization: [
      { name: "Metabase",      level: 4, years: 7, category: "visualization" },
      { name: "Microstrategy", level: 3, years: 4, category: "visualization" }
    ],
    devops: [
      { name: "Atlassian (JIRA/Confluence)", level: 5, years: 7,  category: "devops" },
      { name: "Excel",                       level: 5, years: 9,  category: "devops" },
      { name: "PyCharm",                     level: 4, years: 5,  category: "devops" },
      { name: "Git/GitHub",                  level: 3, years: 11, category: "devops" },
      { name: "AWS",                         level: 3, years: 7,  category: "devops" },
      { name: "Docker",                      level: 3, years: 2,  category: "devops" },
      { name: "CI/CD",                       level: 3, years: 3,  category: "devops" },
      { name: "Jenkins",                     level: 3, years: 2,  category: "devops" },
      { name: "Datadog",                     level: 3, years: 2,  category: "devops" },
      { name: "RStudio",                     level: 3, years: 1,  category: "devops" },
      { name: "Kubernetes",                  level: 2, years: 1,  category: "devops" }
    ],
    ai_agentic: [
      { name: "Claude Code",         level: 4, years: 1, category: "ai_agentic" },
      { name: "Cursor",              level: 4, years: 1, category: "ai_agentic" },
      { name: "Agentic Programming", level: 3, years: 1, category: "ai_agentic" }
    ],
    soft_skills: [
      { name: { es: "Proactividad",            en: "Proactivity" },         level: 5, category: "soft_skills" },
      { name: { es: "Organización",            en: "Organisation" },        level: 5, category: "soft_skills" },
      { name: { es: "Trabajo en equipo",       en: "Teamwork" },            level: 5, category: "soft_skills" },
      { name: { es: "Asertividad",             en: "Assertiveness" },       level: 5, category: "soft_skills" },
      { name: { es: "Liderazgo",               en: "Leadership" },          level: 4, category: "soft_skills" },
      { name: { es: "Comunicación",            en: "Communication" },       level: 4, category: "soft_skills" },
      { name: { es: "Resolución de problemas", en: "Problem solving" },     level: 4, category: "soft_skills" },
      { name: { es: "Metodologías Ágiles",     en: "Agile Methodologies" }, level: 4, category: "soft_skills" },
      { name: { es: "Resiliencia",             en: "Resilience" },          level: 4, category: "soft_skills" },
      { name: { es: "Gestión del estrés",      en: "Stress management" },   level: 4, category: "soft_skills" },
      { name: { es: "Adaptabilidad",           en: "Adaptability" },        level: 3, category: "soft_skills" }
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
      name: { es: "Inglés", en: "English" },
      level: { es: "Profesional (Working)", en: "Professional (Working)" }
    },
    {
      name: { es: "Chino mandarín", en: "Mandarin Chinese" },
      level: { es: "Elemental", en: "Elementary" }
    },
    {
      name: { es: "Wēnzhōuhuà (dialecto)", en: "Wēnzhōuhuà (dialect)" },
      level: { es: "Avanzado", en: "Advanced" }
    },
    {
      name: { es: "Qīngtianhuà (dialecto)", en: "Qīngtianhuà (dialect)" },
      level: { es: "Avanzado", en: "Advanced" }
    }
  ],
  ui: {
    nav: {
      summary:      { es: "Resumen",     en: "Summary" },
      experience:   { es: "Experiencia", en: "Experience" },
      skills:       { es: "Skills",      en: "Skills" },
      projects:     { es: "Proyectos",   en: "Projects" },
      background:   { es: "Formación",   en: "Education" },
      achievements: { es: "Logros",      en: "Achievements" }
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
        data_engineering: { es: "Ingeniería de datos",  en: "Data Engineering" },
        sql_databases:    { es: "SQL & Bases de datos", en: "SQL & Databases" },
        languages:        { es: "Lenguajes",            en: "Languages" },
        visualization:    { es: "BI & Visualización",   en: "BI & Visualization" },
        devops:           { es: "DevOps & Tools",       en: "DevOps & Tools" },
        ai_agentic:       { es: "AI & Agéntica",        en: "AI & Agentic" },
        soft_skills:      { es: "Soft skills",          en: "Soft skills" }
      },
      tooltip_format: {
        es: "{years} años · Nivel {level}/5",
        en: "{years} years · Level {level}/5"
      },
      tooltip_format_soft: {
        es: "Nivel {level}/5",
        en: "Level {level}/5"
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
