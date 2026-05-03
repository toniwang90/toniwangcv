const CV_DATA = {
  profile: {
    name: "Toni Wang",
    title: "Lead Data Engineer",
    location: "Madrid, España (residencia: Molina de Segura, Murcia)",
    summary: "Ingeniero informático apasionado por los datos, con +14 años de experiencia en business intelligence, big data y machine learning. He liderado proyectos de data analysis, integration, discovery y visualisation, construyendo data warehouses desde cero e integrando múltiples fuentes para convertir datos en producto.",
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
      description: "Liderazgo técnico y humano de un equipo de 8 Analytics Engineers, con foco en Partner Reporting y Finanzas. Alineo la estrategia de datos con departamentos clave de la compañía (Marketing, Finanzas y Operaciones).",
      impact: [
        "Lidero un equipo de 8 Analytics Engineers, principalmente en las verticales de Partner Reporting y Finanzas",
        "Supervisión y gestión del proceso de contrataciones y crecimiento del equipo",
        "Creación y mantenimiento de una fuente de datos única y real, eligiendo las tecnologías que mejor se adaptan a cada problema de negocio",
        "Recolección y priorización de requisitos de Stakeholders para construir productos data-driven"
      ],
      stack: ["Snowflake", "Python", "Airflow", "dbt", "AWS", "Metabase", "Pandas", "Spark", "Fivetran"],
      projects: [
        {
          name: "Evolución de la plataforma de datos corporativa",
          description: "Liderazgo de la evolución continua del data warehouse y la plataforma de datos de Fever, sirviendo a Marketing, Finanzas y Operaciones como única fuente de verdad.",
          stack: ["Snowflake", "Python", "Airflow", "dbt", "AWS"],
          outcome: "Plataforma consolidada como única fuente de verdad para los departamentos clave de la compañía"
        },
        {
          name: "Modernización del stack de datos",
          description: "Modernización progresiva del stack: introducción de nuevas tecnologías de orquestación, transformación y calidad de datos para escalar el equipo y los casos de uso.",
          stack: ["dbt", "Airflow", "Fivetran", "Snowflake"],
          outcome: "Stack actualizado para soportar el crecimiento del equipo y la complejidad creciente de los casos de uso"
        },
        {
          name: "Productos de datos para stakeholders",
          description: "Construcción de productos data-driven para Marketing, Finanzas y Operaciones: dashboards estratégicos, modelos de attribution y métricas de negocio en producción.",
          stack: ["Snowflake", "Metabase", "Python"],
          outcome: "Reporting estratégico productivo que sirve como base de decisión a Partner Reporting y Finanzas"
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
      description: "Análisis y desarrollo de un data warehouse desde cero (ingesta, modelado, transformaciones, capa de presentación y visualización), integrando múltiples fuentes de datos de marketing y producto.",
      impact: [
        "Construcción end-to-end del data warehouse de Fever en Snowflake desde cero",
        "Escala alcanzada: +50 fuentes integradas y +1.000 tablas productivas",
        "Crecimiento del departamento de datos de 2 ingenieros a más de 30 personas",
        "Integración de fuentes clave: Google Analytics, Facebook, Mixpanel, Adwords, funnel.io"
      ],
      stack: ["Snowflake", "Python", "Pandas", "Spark", "Airflow", "Fivetran", "Metabase", "Microstrategy", "PostgreSQL", "AWS", "JQL", "funnel.io"],
      projects: [
        {
          name: "Data Warehouse corporativo en Snowflake",
          description: "Diseño, construcción y mantenimiento del data warehouse central de la compañía sobre Snowflake, sirviendo a Marketing, Producto y Finanzas.",
          stack: ["Snowflake", "Python", "Airflow", "Fivetran"],
          outcome: "+1.000 tablas productivas; soporte al crecimiento del departamento de 2 a 30+ ingenieros de datos"
        },
        {
          name: "Integración multi-fuente de marketing",
          description: "Ingesta y normalización de datos de plataformas (Google Analytics, Facebook, Mixpanel, Adwords) para análisis unificado de adquisición y conversión.",
          stack: ["funnel.io", "Fivetran", "Python", "Airflow"],
          outcome: "+50 fuentes integradas en el data warehouse para análisis cross-canal"
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
      description: "Análisis y desarrollo de un sistema nuevo de BI utilizando tecnologías Big Data, integrando múltiples fuentes vía API en un único data warehouse.",
      impact: [
        "Diseño e implementación de un stack Big Data sobre Cloudera (HDFS, Spark, Hive, Sqoop, Flume)",
        "Integración API de fuentes externas: Google Analytics, Facebook, Shopify"
      ],
      stack: ["Apache Hadoop", "HDFS", "Spark", "Hive", "Sqoop", "Flume", "Cloudera", "PostgreSQL", "Scala", "Shell", "Pentaho", "Microstrategy"],
      projects: [
        {
          name: "Plataforma BI Big Data e-commerce",
          description: "Construcción de un sistema de BI sobre stack Cloudera para alimentar reporting de e-commerce.",
          stack: ["Hadoop", "Spark", "Hive", "Microstrategy"],
          outcome: "Visión unificada de las distintas fuentes de venta online en un único data warehouse"
        }
      ]
    },
    {
      id: "exp-004",
      company: "Tempe (Grupo Inditex)",
      role: "Analista de Datos / Técnico BI",
      start: "2016-06",
      end: "2017-02",
      current: false,
      description: "Análisis inteligente de datos para la obtención de conocimiento accionable, resolución de incidencias en reporting y desarrollo de nuevos informes.",
      impact: [
        "Resolución de incidencias y mantenimiento del reporting corporativo",
        "Desarrollo de nuevos informes y modelos analíticos"
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
      description: "Consultor Business Intelligence en el Centro de Excelencia BI de Murcia. Cliente principal: Gas Natural Fenosa.",
      impact: [
        "Soporte y desarrollo de datamarts para Gas Natural Fenosa",
        "Resolución de incidencias y mantenimiento evolutivo",
        "Desarrollo de proyectos ETL end-to-end hasta capa de reporting"
      ],
      stack: ["PL/SQL", "Microstrategy", "Oracle SQL Developer"],
      projects: [
        {
          name: "Mantenimiento y evolución de datamarts — Gas Natural Fenosa",
          description: "Diseño técnico y funcional de nuevos datamarts y desarrollo de proyectos ETL completos hasta reporting en Microstrategy.",
          stack: ["PL/SQL", "Oracle SQL Developer", "Microstrategy"],
          outcome: "Continuidad operativa de los datamarts del cliente y entrega de nuevos desarrollos end-to-end"
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
      description: "Análisis inteligente de datos y extracción de información y conocimiento a partir de grandes volúmenes de datos.",
      impact: [
        "Aplicación de técnicas de minería de datos para extracción de conocimiento de grandes volúmenes"
      ],
      stack: ["RStudio", "Weka", "Microsoft SQL Management Studio", "Kettle"],
      projects: []
    },
    {
      id: "exp-007",
      company: "Freelance",
      role: "Desarrollador Web/Software",
      start: "2014-04",
      end: "2015-09",
      current: false,
      description: "Desarrollo de aplicaciones de escritorio, páginas web y módulos de automatización de trabajo para diversos clientes.",
      impact: [
        "Entrega de proyectos a medida combinando frontend, backend y automatización"
      ],
      stack: ["Java", "JavaScript", "PHP", "HTML", "CSS"],
      projects: []
    },
    {
      id: "exp-008",
      company: "STEL Solutions",
      role: "Programador Web",
      start: "2013-02",
      end: "2013-10",
      current: false,
      description: "Desarrollo web mediante CMS Joomla y desarrollo de comercios electrónicos con Prestashop.",
      impact: [
        "Diseño y desarrollo de la aplicación STEL Corner"
      ],
      stack: ["HTML", "PHP", "CSS", "JavaScript", "Joomla", "Prestashop"],
      projects: []
    },
    {
      id: "exp-009",
      company: "MetaEnlace Sistemas de Información",
      role: "Prácticas Curriculares",
      start: "2012-06",
      end: "2012-07",
      current: false,
      description: "Prácticas curriculares de la Universidad de Murcia: desarrollo de macros y plantillas de reporting.",
      impact: [
        "Desarrollo de macros en VBA",
        "Generación de plantillas con JasperReport"
      ],
      stack: ["VBA", "C#", "Java", "JasperReport"],
      projects: []
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
      degree: "Máster Universitario",
      field: "Nuevas Tecnologías Informáticas (modalidad bilingüe en inglés)",
      start: "2014",
      end: "2015",
      highlights: []
    },
    {
      institution: "Universidad de Murcia",
      degree: "Grado",
      field: "Ingeniería Informática, Mención en Computación",
      start: "2009",
      end: "2014",
      highlights: []
    }
  ],
  certifications: [
    {
      name: "Oracle Database SQL Expert (1Z0-047)",
      issuer: "Oracle",
      year: "2015",
      url: null
    },
    {
      name: "Java SE 8 Programmer I (1Z0-803)",
      issuer: "Oracle",
      year: "2016",
      url: null
    },
    {
      name: "Oracle Database 11g Data Warehousing Certified Implementation Specialist (1Z0-515)",
      issuer: "Oracle",
      year: "2016",
      url: null
    }
  ],
  honors: [
    {
      name: "Beca Santander de Prácticas en PYMES",
      issuer: "Santander CRUE CEPYME",
      year: "2013"
    }
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Chino mandarín (Wenzhou Wu)", level: "Nativo" },
    { name: "Chino mandarín (Qingtianhua)", level: "Nativo" },
    { name: "Inglés", level: "Profesional (Working)" },
    { name: "Chino mandarín (estándar)", level: "Elemental" },
    { name: "Francés", level: "Elemental" }
  ]
};
