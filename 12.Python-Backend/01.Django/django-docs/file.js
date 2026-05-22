const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  LevelFormat,
  PageBreak,
  PageNumber,
} = require("docx");
const fs = require("fs");

// ─── design tokens ───────────────────────────────────────────────────────────
const C = {
  navy: "1B2A4A",
  teal: "0F766E",
  tealLight: "CCFBF1",
  amber: "92400E",
  amberBg: "FEF3C7",
  red: "991B1B",
  redBg: "FEE2E2",
  green: "166534",
  greenBg: "DCFCE7",
  purple: "4C1D95",
  purpleBg: "EDE9FE",
  codeBg: "F1F5F9",
  codeBorder: "CBD5E1",
  accent: "0F766E",
  white: "FFFFFF",
  gray1: "F8FAFC",
  gray2: "E2E8F0",
  gray3: "94A3B8",
  gray4: "475569",
  dark: "1E293B",
};

const FONT = "Calibri";
const MONO = "Courier New";
const PAGE_W = 9360; // content width in DXA (US Letter, 1-inch margins)

// ─── helpers ─────────────────────────────────────────────────────────────────

const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: 22, ...o });
const mono = (t, o = {}) =>
  new TextRun({ text: t, font: MONO, size: 19, ...o });

const p = (children, opts = {}) =>
  new Paragraph({
    spacing: { before: 80, after: 120 },
    ...opts,
    children: typeof children === "string" ? [run(children)] : children,
  });

const h1 = (t) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 520, after: 200 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 10, color: C.teal, space: 6 },
    },
    children: [
      new TextRun({ text: t, font: FONT, size: 44, bold: true, color: C.navy }),
    ],
  });

const h2 = (t) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 380, after: 160 },
    children: [
      new TextRun({ text: "▌ ", font: FONT, size: 32, color: C.teal }),
      new TextRun({ text: t, font: FONT, size: 32, bold: true, color: C.navy }),
    ],
  });

const h3 = (t) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 260, after: 100 },
    children: [
      new TextRun({ text: t, font: FONT, size: 24, bold: true, color: C.teal }),
    ],
  });

const h4 = (t) =>
  new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({ text: t, font: FONT, size: 22, bold: true, color: C.dark }),
    ],
  });

const bullet = (children, level = 0) =>
  new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60 },
    children: typeof children === "string" ? [run(children)] : children,
  });

const numbered = (children, level = 0) =>
  new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { before: 60, after: 60 },
    children: typeof children === "string" ? [run(children)] : children,
  });

const spacer = (before = 200) =>
  new Paragraph({ spacing: { before, after: 0 }, children: [run("")] });

const hr = () =>
  new Paragraph({
    spacing: { before: 240, after: 240 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.gray2 } },
    children: [run("")],
  });

const pb = () => new Paragraph({ children: [new PageBreak()] });

// ─── code block ──────────────────────────────────────────────────────────────
function codeBlock(lines) {
  const bdr = { style: BorderStyle.SINGLE, size: 4, color: C.codeBorder };
  return lines.map(
    (line, i) =>
      new Paragraph({
        spacing: {
          before: i === 0 ? 120 : 0,
          after: i === lines.length - 1 ? 120 : 0,
        },
        indent: { left: 360 },
        border: {
          top: i === 0 ? bdr : undefined,
          bottom: i === lines.length - 1 ? bdr : undefined,
          left: { style: BorderStyle.SINGLE, size: 16, color: C.teal },
          right: bdr,
        },
        shading: { fill: C.codeBg, type: ShadingType.CLEAR },
        children: [
          new TextRun({
            text: line || " ",
            font: MONO,
            size: 18,
            color: C.dark,
          }),
        ],
      })
  );
}

// ─── callout box (tip / note / warn) ─────────────────────────────────────────
function callout(icon, label, body, fillColor, borderColor) {
  const bdr = { style: BorderStyle.SINGLE, size: 4, color: borderColor };
  const left = { style: BorderStyle.SINGLE, size: 20, color: borderColor };
  return [
    new Paragraph({
      spacing: { before: 160, after: 0 },
      indent: { left: 200, right: 200 },
      border: { top: bdr, left, right: bdr },
      shading: { fill: fillColor, type: ShadingType.CLEAR },
      children: [
        new TextRun({
          text: `${icon}  ${label}`,
          font: FONT,
          size: 20,
          bold: true,
          color: borderColor,
        }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 160 },
      indent: { left: 200, right: 200 },
      border: { bottom: bdr, left, right: bdr },
      shading: { fill: fillColor, type: ShadingType.CLEAR },
      children: [
        new TextRun({ text: body, font: FONT, size: 20, color: "333333" }),
      ],
    }),
  ];
}

const tip = (t) => callout("💡", "Tip", t, C.greenBg, C.green);
const note = (t) => callout("📝", "Note", t, C.tealLight, C.teal);
const warn = (t) => callout("⚠️", "Watch out", t, C.amberBg, C.amber);
const key = (t) => callout("🔑", "Key idea", t, C.purpleBg, C.purple);

// ─── two-column comparison table ─────────────────────────────────────────────
function twoCol(headers, rows, colWidths = [4680, 4680]) {
  const border = { style: BorderStyle.SINGLE, size: 1, color: C.gray2 };
  const borders = {
    top: border,
    bottom: border,
    left: border,
    right: border,
    insideH: border,
    insideV: border,
  };

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(
      (h, ci) =>
        new TableCell({
          borders,
          width: { size: colWidths[ci], type: WidthType.DXA },
          shading: { fill: C.navy, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 140, right: 140 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: h,
                  font: FONT,
                  size: 20,
                  bold: true,
                  color: C.white,
                }),
              ],
            }),
          ],
        })
    ),
  });

  const dataRows = rows.map(
    (row, ri) =>
      new TableRow({
        children: row.map(
          (cell, ci) =>
            new TableCell({
              borders,
              width: { size: colWidths[ci], type: WidthType.DXA },
              shading: {
                fill: ri % 2 === 0 ? C.white : C.gray1,
                type: ShadingType.CLEAR,
              },
              margins: { top: 80, bottom: 80, left: 140, right: 140 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cell,
                      font:
                        cell.startsWith("#") || cell.startsWith("@")
                          ? MONO
                          : FONT,
                      size: 20,
                      color: C.dark,
                    }),
                  ],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

// ─── section label pill ──────────────────────────────────────────────────────
const sectionPill = (label, color = C.teal) =>
  new Paragraph({
    spacing: { before: 0, after: 80 },
    shading: { fill: C.tealLight, type: ShadingType.CLEAR },
    border: { left: { style: BorderStyle.SINGLE, size: 16, color: C.teal } },
    indent: { left: 120 },
    children: [
      new TextRun({
        text: `  ${label}`,
        font: FONT,
        size: 18,
        bold: true,
        color: C.teal,
      }),
    ],
  });

// ─── inline code run ─────────────────────────────────────────────────────────
const ic = (t) =>
  new TextRun({
    text: ` ${t} `,
    font: MONO,
    size: 19,
    shading: { fill: C.codeBg, type: ShadingType.CLEAR },
  });

// ─── COVER PAGE ──────────────────────────────────────────────────────────────
function coverPage() {
  return [
    spacer(1600),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [
        new TextRun({
          text: "Django REST Framework",
          font: FONT,
          size: 64,
          bold: true,
          color: C.navy,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      border: {
        bottom: {
          style: BorderStyle.SINGLE,
          size: 12,
          color: C.teal,
          space: 10,
        },
      },
      children: [
        new TextRun({
          text: "The @api_view Route",
          font: FONT,
          size: 40,
          color: C.teal,
        }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 60, after: 200 },
      children: [
        new TextRun({
          text: "A structured learning path — from setup to production-style API design",
          font: FONT,
          size: 24,
          italics: true,
          color: C.gray4,
        }),
      ],
    }),
    spacer(800),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 40 },
      children: [
        new TextRun({
          text: "What you will learn",
          font: FONT,
          size: 22,
          bold: true,
          color: C.dark,
        }),
      ],
    }),
    ...[
      "Environment setup — virtualenv, pip install, Django project",
      "Database — PostgreSQL config, migrations, custom user model",
      "DRF overview — what it is, how it layers on top of Django",
      "APIView & ViewSet — introduction and when to use each",
      "The @api_view decorator — deep-dive, every pattern",
      "Serializers — validate input, shape output",
      "Authentication — JWT with @api_view",
      "Permissions & throttling with decorators",
      "Real-world mini-project — full CRUD API using only @api_view",
    ].map(
      (t) =>
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 40 },
          children: [
            new TextRun({
              text: "✓  ",
              font: FONT,
              size: 20,
              color: C.teal,
              bold: true,
            }),
            new TextRun({ text: t, font: FONT, size: 20, color: C.gray4 }),
          ],
        })
    ),
    spacer(600),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: "Django 5.x  ·  DRF 3.15  ·  Python 3.12  ·  2025",
          font: FONT,
          size: 20,
          color: C.gray3,
        }),
      ],
    }),
    pb(),
  ];
}

// ─── CHAPTER 1: ENV SETUP ────────────────────────────────────────────────────
function chapter1() {
  return [
    h1("1  Environment Setup"),
    p(
      "Before writing a single line of DRF code, you need Python, a virtual environment, Django, and DRF installed. This chapter gets you to the point where you can type code and see results."
    ),
    spacer(80),

    h2("1.1  Python & pip"),
    p([
      run("Install Python 3.10 or newer. Confirm with "),
      ic("python --version"),
      run(" and "),
      ic("pip --version"),
      run("."),
    ]),
    ...codeBlock([
      "# macOS",
      "brew install python",
      "",
      "# Ubuntu / Debian",
      "sudo apt install python3 python3-pip python3-venv -y",
      "",
      "# Windows — download from python.org",
      "# tick 'Add Python to PATH' during install",
    ]),
    spacer(120),

    h2("1.2  Virtual Environment"),
    p(
      "Always isolate each project. A virtual environment is a folder that holds its own copy of Python and all pip packages — changes here don't affect anything else on your machine."
    ),
    ...codeBlock([
      "# Create the virtualenv (do this once per project)",
      "python3 -m venv venv",
      "",
      "# Activate it — you must do this every new terminal session",
      "source venv/bin/activate          # macOS / Linux",
      "venv\\Scripts\\activate.bat         # Windows CMD",
      "",
      "# Your prompt now shows:  (venv) $",
      "# Everything you pip install goes into this folder only",
      "",
      "# Deactivate when done",
      "deactivate",
    ]),
    ...tip(
      "Never install packages without activating the virtualenv first. If your prompt doesn't show (venv), run the activate command again."
    ),
    spacer(120),

    h2("1.3  Install Django + DRF"),
    ...codeBlock([
      "(venv) $ pip install django djangorestframework",
      "",
      "# For JWT authentication (used later in the notes)",
      "(venv) $ pip install djangorestframework-simplejwt",
      "",
      "# For PostgreSQL",
      "(venv) $ pip install psycopg2-binary",
      "",
      "# Lock your versions",
      "(venv) $ pip freeze > requirements.txt",
      "",
      "# Anyone cloning the project restores with:",
      "(venv) $ pip install -r requirements.txt",
    ]),
    spacer(120),

    h2("1.4  Create a Django Project and App"),
    ...codeBlock([
      "# Create the project (the . puts files in current dir)",
      "django-admin startproject myapi .",
      "",
      "# Create an app inside it",
      "python manage.py startapp posts",
    ]),
    p([
      run("Register DRF and your app in "),
      ic("myapi/settings.py"),
      run(":"),
    ]),
    ...codeBlock([
      "INSTALLED_APPS = [",
      "    'django.contrib.admin',",
      "    'django.contrib.auth',",
      "    # ... other django apps ...",
      "    'rest_framework',    # <-- add DRF",
      "    'posts',             # <-- add your app",
      "]",
    ]),
    spacer(120),

    h2("1.5  Database — PostgreSQL Setup"),
    p(
      "Django ships with SQLite by default. For any real project, swap it for PostgreSQL."
    ),
    ...codeBlock([
      "# myapi/settings.py",
      "DATABASES = {",
      "    'default': {",
      "        'ENGINE':   'django.db.backends.postgresql',",
      "        'NAME':     'myapi_db',",
      "        'USER':     'postgres',",
      "        'PASSWORD': 'yourpassword',",
      "        'HOST':     'localhost',",
      "        'PORT':     '5432',",
      "    }",
      "}",
    ]),
    ...note(
      "Use python-decouple to store DB credentials in a .env file instead of hardcoding them. Never commit real passwords to git."
    ),
    spacer(120),

    h2("1.6  Migrations"),
    p(
      "Migrations are how Django creates and updates database tables from your Python models. Every time you change a model, you run two commands."
    ),
    ...codeBlock([
      "# Step 1: detect model changes and create a migration file",
      "python manage.py makemigrations",
      "",
      "# Step 2: apply migration files to the database",
      "python manage.py migrate",
      "",
      "# See all migrations and their status",
      "python manage.py showmigrations",
    ]),
    spacer(100),
    twoCol(
      ["Command", "What it does"],
      [
        [
          "makemigrations",
          "Reads your models, creates a .py file describing the DB change",
        ],
        ["migrate", "Runs those .py files against the actual database"],
        [
          "showmigrations",
          "Lists every migration and whether it has been applied",
        ],
        [
          "sqlmigrate app 0001",
          "Shows the raw SQL a migration would run (read-only)",
        ],
      ],
      [3600, 5760]
    ),
    spacer(80),
    pb(),
  ];
}

// ─── CHAPTER 2: DRF OVERVIEW ─────────────────────────────────────────────────
function chapter2() {
  return [
    h1("2  DRF Overview — What and Why"),
    p(
      "Django lets you build websites that return HTML. Django REST Framework (DRF) is a toolkit that sits on top of Django and makes it easy to build APIs that return JSON."
    ),
    spacer(80),

    h2("2.1  What DRF Adds on Top of Django"),
    spacer(60),
    twoCol(
      ["Django (alone)", "DRF (adds on top)"],
      [
        [
          "Returns HTML pages via templates",
          "Returns JSON responses via serializers",
        ],
        ["Forms handle user input", "Serializers handle API input + output"],
        ["Views render templates", "@api_view / ViewSet handle HTTP methods"],
        ["Session auth (cookies)", "Token / JWT auth for stateless APIs"],
        [
          "No built-in API browser",
          "Browsable API — test endpoints in your browser",
        ],
      ]
    ),
    spacer(120),

    h2("2.2  The Building Blocks"),
    p("DRF has four core pieces. You will use all of them:"),
    spacer(80),
    twoCol(
      ["Piece", "What it does"],
      [
        [
          "@api_view",
          "Decorator that turns a plain function into an API endpoint",
        ],
        [
          "Serializer",
          "Converts Python objects to JSON and validates incoming JSON",
        ],
        [
          "Authentication",
          "Checks who is making the request (JWT, Token, Session)",
        ],
        [
          "Permission",
          "Checks if that person is allowed to do what they are asking",
        ],
      ]
    ),
    spacer(120),

    h2("2.3  DRF Global Settings"),
    p([
      run("DRF is configured in "),
      ic("settings.py"),
      run(" under "),
      ic("REST_FRAMEWORK"),
      run(":"),
    ]),
    ...codeBlock([
      "# myapi/settings.py",
      "",
      "REST_FRAMEWORK = {",
      "    # Who is making the request?",
      "    'DEFAULT_AUTHENTICATION_CLASSES': [",
      "        'rest_framework_simplejwt.authentication.JWTAuthentication',",
      "    ],",
      "",
      "    # Are they allowed?",
      "    'DEFAULT_PERMISSION_CLASSES': [",
      "        'rest_framework.permissions.IsAuthenticated',",
      "    ],",
      "",
      "    # Format of responses",
      "    'DEFAULT_RENDERER_CLASSES': [",
      "        'rest_framework.renderers.JSONRenderer',",
      "    ],",
      "}",
      "",
      "# These are project-wide DEFAULTS.",
      "# You can override them per-view with decorators.",
    ]),
    pb(),
  ];
}

// ─── CHAPTER 3: APIVIEW & VIEWSET INTRO ──────────────────────────────────────
function chapter3() {
  return [
    h1("3  APIView and ViewSet — Introduction"),
    p(
      "DRF gives you three ways to build views. This chapter introduces all three so you understand the landscape. The rest of these notes then deep-dive on @api_view."
    ),
    spacer(80),

    h2("3.1  The Three Approaches"),
    spacer(60),
    twoCol(
      ["Approach", "What it is"],
      [
        [
          "@api_view + function",
          "A plain Python function with a decorator. You write every method explicitly. Maximum control. This is what these notes focus on.",
        ],
        [
          "APIView (class)",
          "A class where each method name (get, post, put, delete) maps to an HTTP method. Like @api_view but object-oriented.",
        ],
        [
          "ViewSet + Router",
          "A class that handles all 5 CRUD actions. A Router auto-generates all the URL patterns for you. Least code, least control.",
        ],
      ],
      [2800, 6560]
    ),
    spacer(120),

    h2("3.2  How APIView Works Internally"),
    p("APIView is a class that DRF provides. When a request comes in:"),
    numbered(
      "Django calls the view's as_view() method — this is how classes become URL-compatible."
    ),
    numbered("as_view() creates an instance of your class for each request."),
    numbered(
      "It calls initialize_request() to wrap the Django request in a DRF Request object (which gives you request.data instead of request.POST)."
    ),
    numbered("It runs authentication and permission checks."),
    numbered(
      "It calls the method on your class that matches the HTTP verb: get(), post(), put(), delete()."
    ),
    spacer(100),
    ...codeBlock([
      "# APIView — class-based, one method per HTTP verb",
      "from rest_framework.views import APIView",
      "from rest_framework.response import Response",
      "",
      "class PostList(APIView):",
      "    def get(self, request):          # handles GET",
      "        return Response({'posts': []})",
      "",
      "    def post(self, request):         # handles POST",
      "        return Response({'created': True})",
      "",
      "# urls.py",
      "path('posts/', PostList.as_view()),  # .as_view() is required for classes",
    ]),
    spacer(120),

    h2("3.3  How ViewSet Works Internally"),
    p(
      "A ViewSet is a class where you name methods list(), retrieve(), create(), update(), destroy() instead of get(), post() etc. A Router maps those names to URL patterns automatically."
    ),
    ...codeBlock([
      "# ViewSet — one class covers all 5 CRUD operations",
      "from rest_framework import viewsets",
      "",
      "class PostViewSet(viewsets.ModelViewSet):",
      "    queryset         = Post.objects.all()",
      "    serializer_class = PostSerializer",
      "",
      "# urls.py — Router generates ALL the URL patterns",
      "from rest_framework.routers import DefaultRouter",
      "router = DefaultRouter()",
      "router.register('posts', PostViewSet)",
      "urlpatterns = router.urls",
      "",
      "# Router automatically creates:",
      "#   GET    /posts/        -> list()",
      "#   POST   /posts/        -> create()",
      "#   GET    /posts/<id>/   -> retrieve()",
      "#   PUT    /posts/<id>/   -> update()",
      "#   DELETE /posts/<id>/   -> destroy()",
    ]),
    spacer(120),

    h2("3.4  When to Use Each"),
    spacer(60),
    twoCol(
      ["Use this", "When"],
      [
        [
          "@api_view",
          "You are learning, building a custom endpoint, need full control over logic, or mixing HTTP methods in one function",
        ],
        [
          "APIView",
          "You prefer OOP style, want to share logic between methods via self, or need class-level attributes",
        ],
        [
          "ViewSet + Router",
          "You are building standard CRUD for a model and want the least boilerplate possible",
        ],
      ],
      [2800, 6560]
    ),
    ...key(
      "These notes focus on @api_view because it teaches you to think explicitly about each HTTP method and each decision — which builds the right mental model before you use ViewSet shortcuts."
    ),
    pb(),
  ];
}

// ─── CHAPTER 4: @api_view DEEP DIVE ──────────────────────────────────────────
function chapter4() {
  return [
    h1("4  The @api_view Decorator — Deep Dive"),
    p(
      "@api_view is the heart of function-based DRF views. It is a decorator that takes a list of allowed HTTP methods and turns your plain Python function into a full DRF view."
    ),
    spacer(80),

    h2("4.1  What the Decorator Actually Does"),
    p(
      "When you write @api_view(['GET', 'POST']) above a function, DRF does five things before your function ever runs:"
    ),
    numbered(
      "Wraps the Django HttpRequest in a DRF Request object — gives you request.data, request.query_params, etc."
    ),
    numbered(
      "Rejects any HTTP method not in your list with 405 Method Not Allowed."
    ),
    numbered(
      "Runs authentication — reads the Authorization header and sets request.user."
    ),
    numbered(
      "Runs permission checks — if the user isn't allowed, returns 403 before your code runs."
    ),
    numbered(
      "Handles content negotiation — looks at Accept header and formats the response correctly."
    ),
    spacer(100),
    ...codeBlock([
      "# Anatomy of the simplest possible @api_view",
      "",
      "from rest_framework.decorators import api_view",
      "from rest_framework.response import Response",
      "",
      "# The decorator: ['GET'] = only allow GET requests",
      "@api_view(['GET'])",
      "def hello(request):",
      "    # request is now a DRF Request, not Django's HttpRequest",
      "    # request.method  -> 'GET'",
      "    # request.user    -> authenticated user (or AnonymousUser)",
      "    # request.data    -> parsed request body (JSON, form data, etc.)",
      "    # request.query_params -> URL ?key=value params",
      "    return Response({'message': 'Hello, world!'})",
      "",
      "# Response() wraps your data.",
      "# DRF converts it to JSON automatically.",
    ]),
    spacer(120),

    h2("4.2  Handling Multiple HTTP Methods"),
    p(
      "List every method you want to accept. Inside the function, branch on request.method."
    ),
    ...codeBlock([
      "from rest_framework.decorators import api_view",
      "from rest_framework.response import Response",
      "from rest_framework import status",
      "",
      "from .models import Post",
      "from .serializers import PostSerializer",
      "",
      "@api_view(['GET', 'POST'])     # allow both GET and POST",
      "def post_list(request):",
      "",
      "    if request.method == 'GET':",
      "        posts      = Post.objects.all()",
      "        serializer = PostSerializer(posts, many=True)",
      "        return Response(serializer.data)",
      "",
      "    if request.method == 'POST':",
      "        serializer = PostSerializer(data=request.data)",
      "        if serializer.is_valid():",
      "            serializer.save(author=request.user)",
      "            return Response(serializer.data, status=status.HTTP_201_CREATED)",
      "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
    ]),
    spacer(120),

    h2("4.3  URL Parameters"),
    p(
      "Capture dynamic parts of the URL (like an ID) and receive them as function arguments."
    ),
    ...codeBlock([
      "# urls.py",
      "from django.urls import path",
      "from . import views",
      "",
      "urlpatterns = [",
      "    path('posts/',          views.post_list,   name='post-list'),",
      "    path('posts/<int:pk>/', views.post_detail, name='post-detail'),",
      "]",
    ]),
    ...codeBlock([
      "# views.py",
      "from django.shortcuts import get_object_or_404",
      "",
      "@api_view(['GET', 'PUT', 'DELETE'])",
      "def post_detail(request, pk):     # pk comes from <int:pk> in URL",
      "    post = get_object_or_404(Post, pk=pk)",
      "",
      "    if request.method == 'GET':",
      "        serializer = PostSerializer(post)",
      "        return Response(serializer.data)",
      "",
      "    if request.method == 'PUT':",
      "        serializer = PostSerializer(post, data=request.data)",
      "        if serializer.is_valid():",
      "            serializer.save()",
      "            return Response(serializer.data)",
      "        return Response(serializer.errors, status=400)",
      "",
      "    if request.method == 'DELETE':",
      "        post.delete()",
      "        return Response(status=status.HTTP_204_NO_CONTENT)",
    ]),
    spacer(120),

    h2("4.4  Query Parameters"),
    p([
      run("Read URL query params ("),
      ic("?search=django&page=2"),
      run(") using "),
      ic("request.query_params"),
      run(" — it behaves exactly like a Python dict."),
    ]),
    ...codeBlock([
      "@api_view(['GET'])",
      "def post_list(request):",
      "    search = request.query_params.get('search', '')   # default ''",
      "    page   = request.query_params.get('page', '1')",
      "",
      "    posts = Post.objects.all()",
      "    if search:",
      "        posts = posts.filter(title__icontains=search)",
      "",
      "    serializer = PostSerializer(posts, many=True)",
      "    return Response({",
      "        'count':   posts.count(),",
      "        'page':    int(page),",
      "        'results': serializer.data,",
      "    })",
    ]),
    spacer(120),

    h2("4.5  Status Codes"),
    p(
      "Always return the correct HTTP status code. DRF provides named constants so you never have to remember numbers."
    ),
    spacer(60),
    twoCol(
      ["Constant", "Code", "Use for"],
      [
        ["HTTP_200_OK", "200", "Successful GET, PUT, PATCH"],
        ["HTTP_201_CREATED", "201", "Successful POST (something was created)"],
        ["HTTP_204_NO_CONTENT", "204", "Successful DELETE (nothing to return)"],
        ["HTTP_400_BAD_REQUEST", "400", "Validation failed, bad input"],
        ["HTTP_401_UNAUTHORIZED", "401", "Not authenticated"],
        ["HTTP_403_FORBIDDEN", "403", "Authenticated but not allowed"],
        ["HTTP_404_NOT_FOUND", "404", "Resource doesn't exist"],
      ],
      [4000, 1560, 3800]
    ),
    spacer(80),
    pb(),
  ];
}

// ─── CHAPTER 5: SERIALIZERS ──────────────────────────────────────────────────
function chapter5() {
  return [
    h1("5  Serializers"),
    p(
      "A serializer does two things: it converts Python objects into JSON (serialization) and it validates and converts incoming JSON back into Python (deserialization). Think of it as a two-way translator."
    ),
    spacer(80),

    h2("5.1  Serializer vs ModelSerializer"),
    spacer(60),
    twoCol(
      ["Serializer", "ModelSerializer"],
      [
        [
          "You define every field manually",
          "Reads your model and auto-creates fields",
        ],
        ["No DB interaction", "Adds .save() which writes to the DB"],
        [
          "Use for non-model data (auth tokens, stats)",
          "Use for any model-backed resource",
        ],
      ]
    ),
    spacer(120),

    h2("5.2  Creating a ModelSerializer"),
    ...codeBlock([
      "# posts/serializers.py",
      "from rest_framework import serializers",
      "from .models import Post",
      "",
      "class PostSerializer(serializers.ModelSerializer):",
      "    author_name = serializers.ReadOnlyField(source='author.username')",
      "",
      "    class Meta:",
      "        model  = Post",
      "        fields = ['id', 'title', 'body', 'author_name', 'created_at']",
      "        read_only_fields = ['id', 'author_name', 'created_at']",
      "",
      "# ModelSerializer automatically:",
      "#  - Creates a field for each model field you list",
      "#  - Validates types (CharField checks max_length, etc.)",
      "#  - Provides .save() -> INSERT or UPDATE",
    ]),
    spacer(120),

    h2("5.3  Using a Serializer in a View"),
    ...codeBlock([
      "# Reading (serialization — Python object -> JSON)",
      "post       = Post.objects.get(pk=1)",
      "serializer = PostSerializer(post)",
      "serializer.data        # -> {'id':1, 'title':'Hello', ...}",
      "",
      "# Reading a list",
      "posts      = Post.objects.all()",
      "serializer = PostSerializer(posts, many=True)   # many=True for lists",
      "serializer.data        # -> [{'id':1,...}, {'id':2,...}]",
      "",
      "# Writing (deserialization — JSON -> Python, then save)",
      "serializer = PostSerializer(data=request.data)",
      "if serializer.is_valid():      # runs all validation",
      "    serializer.save()          # calls .create() -> INSERT",
      "else:",
      "    serializer.errors          # {'title': ['This field is required.']}",
      "",
      "# Updating (deserialization with an existing instance)",
      "post       = Post.objects.get(pk=1)",
      "serializer = PostSerializer(post, data=request.data)   # pass instance",
      "if serializer.is_valid():",
      "    serializer.save()          # calls .update() -> UPDATE",
    ]),
    spacer(120),

    h2("5.4  Custom Validation"),
    ...codeBlock([
      "class PostSerializer(serializers.ModelSerializer):",
      "    class Meta:",
      "        model  = Post",
      "        fields = ['title', 'body']",
      "",
      "    # validate_<fieldname> runs for that field",
      "    def validate_title(self, value):",
      "        if len(value) < 5:",
      "            raise serializers.ValidationError(",
      "                'Title must be at least 5 characters.'",
      "            )",
      "        return value",
      "",
      "    # validate() runs after all field validations",
      "    def validate(self, data):",
      "        if data['title'] in data['body']:",
      "            raise serializers.ValidationError(",
      "                'Title should not appear in the body.'",
      "            )",
      "        return data",
    ]),
    pb(),
  ];
}

// ─── CHAPTER 6: AUTH WITH DECORATORS ─────────────────────────────────────────
function chapter6() {
  return [
    h1("6  Authentication with @api_view"),
    p(
      "DRF lets you override authentication and permissions per-view using additional decorators stacked on top of @api_view."
    ),
    spacer(80),

    h2("6.1  The Decorator Stack"),
    p(
      "Decorators are applied bottom-up. The bottom decorator runs first. Always put @api_view at the top (outermost) and your custom logic decorators below it."
    ),
    ...codeBlock([
      "from rest_framework.decorators import api_view, authentication_classes, permission_classes",
      "from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser",
      "from rest_framework_simplejwt.authentication import JWTAuthentication",
      "",
      "# Stack reads top-to-bottom but wraps bottom-to-top:",
      "@api_view(['GET'])               # 1. outer — wraps first",
      "@authentication_classes([JWTAuthentication])  # 2. which auth to use",
      "@permission_classes([IsAuthenticated])         # 3. who is allowed",
      "def my_protected_view(request):",
      "    # request.user is the authenticated user here",
      "    return Response({'user': request.user.email})",
    ]),
    spacer(120),

    h2("6.2  Public vs Protected Views"),
    ...codeBlock([
      "# PUBLIC — anyone can access",
      "@api_view(['GET'])",
      "@permission_classes([AllowAny])   # overrides the global default",
      "def public_view(request):",
      "    return Response({'status': 'open'})",
      "",
      "",
      "# PROTECTED — must be logged in (JWT token required)",
      "@api_view(['GET'])",
      "@authentication_classes([JWTAuthentication])",
      "@permission_classes([IsAuthenticated])",
      "def private_view(request):",
      "    return Response({'email': request.user.email})",
      "",
      "",
      "# ADMIN ONLY",
      "@api_view(['DELETE'])",
      "@permission_classes([IsAdminUser])",
      "def admin_view(request, pk):",
      "    Post.objects.get(pk=pk).delete()",
      "    return Response(status=204)",
    ]),
    spacer(120),

    h2("6.3  Login and Register Endpoints"),
    p(
      "Auth endpoints (register, login) must be public because the user doesn't have a token yet."
    ),
    ...codeBlock([
      "from rest_framework.decorators import api_view, permission_classes",
      "from rest_framework.permissions import AllowAny",
      "from rest_framework_simplejwt.tokens import RefreshToken",
      "from django.contrib.auth import get_user_model",
      "",
      "User = get_user_model()",
      "",
      "@api_view(['POST'])",
      "@permission_classes([AllowAny])    # open to everyone",
      "def register(request):",
      "    email    = request.data.get('email')",
      "    password = request.data.get('password')",
      "",
      "    if not email or not password:",
      "        return Response({'error': 'Email and password required.'}, status=400)",
      "",
      "    user    = User.objects.create_user(email=email, password=password)",
      "    refresh = RefreshToken.for_user(user)",
      "",
      "    return Response({",
      "        'access':  str(refresh.access_token),",
      "        'refresh': str(refresh),",
      "    }, status=201)",
    ]),
    ...note(
      "The login endpoint is handled by SimpleJWT's built-in TokenObtainPairView. You rarely need to write it yourself — just wire up the URL."
    ),
    pb(),
  ];
}

// ─── CHAPTER 7: REAL PROJECT ──────────────────────────────────────────────────
function chapter7() {
  return [
    h1("7  Real-World Mini-Project — Blog API"),
    p(
      "Everything from chapters 1-6 brought together into one working API, using nothing but @api_view. Five endpoints, full CRUD, JWT auth."
    ),
    spacer(80),

    h2("7.1  The Model"),
    ...codeBlock([
      "# posts/models.py",
      "from django.db import models",
      "from django.conf import settings",
      "",
      "class Post(models.Model):",
      "    title      = models.CharField(max_length=200)",
      "    body       = models.TextField()",
      "    author     = models.ForeignKey(",
      "                     settings.AUTH_USER_MODEL,",
      "                     on_delete=models.CASCADE,",
      "                     related_name='posts'",
      "                 )",
      "    created_at = models.DateTimeField(auto_now_add=True)",
      "    updated_at = models.DateTimeField(auto_now=True)",
      "",
      "    class Meta:",
      "        ordering = ['-created_at']",
      "",
      "    def __str__(self):",
      "        return self.title",
    ]),
    spacer(120),

    h2("7.2  The Serializer"),
    ...codeBlock([
      "# posts/serializers.py",
      "from rest_framework import serializers",
      "from .models import Post",
      "",
      "class PostSerializer(serializers.ModelSerializer):",
      "    author_username = serializers.ReadOnlyField(source='author.username')",
      "",
      "    class Meta:",
      "        model  = Post",
      "        fields = ['id', 'title', 'body', 'author_username', 'created_at']",
      "        read_only_fields = ['id', 'author_username', 'created_at']",
    ]),
    spacer(120),

    h2("7.3  All Five Views — @api_view Only"),
    ...codeBlock([
      "# posts/views.py",
      "from rest_framework.decorators import api_view, permission_classes",
      "from rest_framework.permissions import IsAuthenticated, AllowAny",
      "from rest_framework.response import Response",
      "from rest_framework import status",
      "from django.shortcuts import get_object_or_404",
      "",
      "from .models import Post",
      "from .serializers import PostSerializer",
      "",
      "",
      "# ── GET all posts (public) / POST new post (auth required) ──",
      "@api_view(['GET', 'POST'])",
      "def post_list(request):",
      "    if request.method == 'GET':",
      "        posts      = Post.objects.all()",
      "        serializer = PostSerializer(posts, many=True)",
      "        return Response(serializer.data)",
      "",
      "    # POST requires login",
      "    if not request.user.is_authenticated:",
      "        return Response({'error': 'Login required.'}, status=401)",
      "",
      "    serializer = PostSerializer(data=request.data)",
      "    if serializer.is_valid():",
      "        serializer.save(author=request.user)",
      "        return Response(serializer.data, status=201)",
      "    return Response(serializer.errors, status=400)",
      "",
      "",
      "# ── GET one post / PUT update / DELETE ────────────────────",
      "@api_view(['GET', 'PUT', 'DELETE'])",
      "def post_detail(request, pk):",
      "    post = get_object_or_404(Post, pk=pk)",
      "",
      "    if request.method == 'GET':",
      "        serializer = PostSerializer(post)",
      "        return Response(serializer.data)",
      "",
      "    # Only the author can edit or delete",
      "    if post.author != request.user:",
      "        return Response({'error': 'Not your post.'}, status=403)",
      "",
      "    if request.method == 'PUT':",
      "        serializer = PostSerializer(post, data=request.data)",
      "        if serializer.is_valid():",
      "            serializer.save()",
      "            return Response(serializer.data)",
      "        return Response(serializer.errors, status=400)",
      "",
      "    if request.method == 'DELETE':",
      "        post.delete()",
      "        return Response(status=204)",
      "",
      "",
      "# ── GET posts by the currently logged-in user ──────────────",
      "@api_view(['GET'])",
      "@permission_classes([IsAuthenticated])",
      "def my_posts(request):",
      "    posts      = Post.objects.filter(author=request.user)",
      "    serializer = PostSerializer(posts, many=True)",
      "    return Response(serializer.data)",
    ]),
    spacer(120),

    h2("7.4  URLs"),
    ...codeBlock([
      "# posts/urls.py",
      "from django.urls import path",
      "from . import views",
      "",
      "urlpatterns = [",
      "    path('posts/',          views.post_list,   name='post-list'),",
      "    path('posts/<int:pk>/', views.post_detail, name='post-detail'),",
      "    path('posts/mine/',     views.my_posts,    name='my-posts'),",
      "]",
      "",
      "# myapi/urls.py — include these under /api/v1/",
      "from django.urls import path, include",
      "from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView",
      "",
      "urlpatterns = [",
      "    path('api/v1/',        include('posts.urls')),",
      "    path('api/v1/login/',  TokenObtainPairView.as_view()),   # built-in login",
      "    path('api/v1/refresh/',TokenRefreshView.as_view()),      # built-in refresh",
      "]",
    ]),
    spacer(120),

    h2("7.5  Testing with Postman / curl"),
    h3("Register"),
    ...codeBlock([
      "POST /api/v1/register/",
      "Content-Type: application/json",
      "",
      '{ "email": "alice@example.com", "password": "secret123" }',
      "",
      "# Response:",
      '{ "access": "eyJ...", "refresh": "eyJ..." }',
    ]),
    h3("Login"),
    ...codeBlock([
      "POST /api/v1/login/",
      "Content-Type: application/json",
      "",
      '{ "email": "alice@example.com", "password": "secret123" }',
    ]),
    h3("Create a Post"),
    ...codeBlock([
      "POST /api/v1/posts/",
      "Authorization: Bearer eyJ...   <-- paste your access token",
      "Content-Type: application/json",
      "",
      '{ "title": "My first post", "body": "Hello world" }',
    ]),
    h3("Get All Posts"),
    ...codeBlock([
      "GET /api/v1/posts/",
      "# No Authorization header needed — public endpoint",
    ]),
    pb(),
  ];
}

// ─── CHAPTER 8: QUICK REFERENCE ──────────────────────────────────────────────
function chapter8() {
  return [
    h1("8  Quick Reference Cheatsheet"),
    spacer(80),

    h2("@api_view Decorator Patterns"),
    spacer(40),
    twoCol(
      ["Pattern", "Code"],
      [
        ["Allow GET only", "@api_view(['GET'])"],
        ["Allow GET and POST", "@api_view(['GET', 'POST'])"],
        ["Allow GET, PUT, DELETE", "@api_view(['GET', 'PUT', 'DELETE'])"],
        ["Partial update (PATCH)", "@api_view(['PATCH'])"],
        ["Public endpoint", "@permission_classes([AllowAny])"],
        ["Protected endpoint", "@permission_classes([IsAuthenticated])"],
        ["Admin only", "@permission_classes([IsAdminUser])"],
        ["JWT auth", "@authentication_classes([JWTAuthentication])"],
      ]
    ),
    spacer(120),

    h2("request Object Attributes"),
    spacer(40),
    twoCol(
      ["Attribute", "Contains"],
      [
        [
          "request.method",
          "HTTP verb as string: 'GET', 'POST', 'PUT', 'DELETE'",
        ],
        [
          "request.data",
          "Parsed request body — works for JSON, form data, multipart",
        ],
        ["request.query_params", "URL query string as dict — ?key=value"],
        ["request.user", "Authenticated user object (or AnonymousUser)"],
        ["request.auth", "The raw auth token object"],
        ["request.headers", "HTTP headers as dict"],
        ["request.FILES", "Uploaded files"],
      ]
    ),
    spacer(120),

    h2("Response Status Codes"),
    spacer(40),
    twoCol(
      ["Status", "When to use"],
      [
        ["HTTP_200_OK", "GET success, PUT/PATCH success"],
        ["HTTP_201_CREATED", "POST success — something was created"],
        ["HTTP_204_NO_CONTENT", "DELETE success — nothing to return"],
        ["HTTP_400_BAD_REQUEST", "Invalid input, validation failed"],
        ["HTTP_401_UNAUTHORIZED", "No credentials / bad token"],
        ["HTTP_403_FORBIDDEN", "Authenticated but not permitted"],
        ["HTTP_404_NOT_FOUND", "Object does not exist"],
      ]
    ),
    spacer(120),

    h2("Common Mistakes"),
    spacer(40),
    twoCol(
      ["Mistake", "Fix"],
      [
        [
          "Returning a dict directly",
          "Always wrap in Response(): return Response({'key': 'val'})",
        ],
        [
          "Using request.POST instead of request.data",
          "DRF uses request.data — it handles JSON, form data, etc.",
        ],
        [
          "Forgetting many=True on a list",
          "PostSerializer(posts, many=True) — required for QuerySets",
        ],
        [
          "Saving serializer without passing author",
          "serializer.save(author=request.user) — inject extra fields",
        ],
        [
          "Not calling is_valid() before .save()",
          "Always check: if serializer.is_valid(): then save",
        ],
        [
          "Wrong decorator order",
          "@api_view always on top, other decorators below it",
        ],
        [
          "Method not in @api_view list",
          "Add it: @api_view(['GET', 'POST']) — otherwise 405 error",
        ],
      ]
    ),
    spacer(120),

    h2("What to Learn Next"),
    bullet([
      run("Pagination"),
      run(" — ", { color: C.gray4 }),
      run("PageNumberPagination, LimitOffsetPagination", { color: C.gray4 }),
    ]),
    bullet([
      run("Filtering"),
      run(" — ", { color: C.gray4 }),
      run("django-filter, SearchFilter, OrderingFilter", { color: C.gray4 }),
    ]),
    bullet([
      run("Throttling"),
      run(" — ", { color: C.gray4 }),
      run("AnonRateThrottle, UserRateThrottle, @throttle_classes", {
        color: C.gray4,
      }),
    ]),
    bullet([
      run("Nested serializers"),
      run(" — ", { color: C.gray4 }),
      run("related objects, depth, SerializerMethodField", { color: C.gray4 }),
    ]),
    bullet([
      run("File uploads"),
      run(" — ", { color: C.gray4 }),
      run("request.FILES, ImageField, FileField", { color: C.gray4 }),
    ]),
    bullet([
      run("Testing APIs"),
      run(" — ", { color: C.gray4 }),
      run("APITestCase, APIClient, force_authenticate()", { color: C.gray4 }),
    ]),
    bullet([
      run("ViewSet + Router"),
      run(" — ", { color: C.gray4 }),
      run("ModelViewSet, DefaultRouter, custom actions with @action", {
        color: C.gray4,
      }),
    ]),

    spacer(400),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 0 },
      border: { top: { style: BorderStyle.SINGLE, size: 4, color: C.teal } },
      children: [
        new TextRun({
          text: "Build something real — that is the fastest way to learn DRF.",
          font: FONT,
          size: 26,
          bold: true,
          color: C.navy,
        }),
      ],
    }),
  ];
}

// ─── BUILD DOCUMENT ───────────────────────────────────────────────────────────
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 44, bold: true, font: FONT, color: C.navy },
        paragraph: { spacing: { before: 520, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: FONT, color: C.navy },
        paragraph: { spacing: { before: 380, after: 160 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: FONT, color: C.teal },
        paragraph: { spacing: { before: 260, after: 100 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
          {
            level: 1,
            format: LevelFormat.BULLET,
            text: "◦",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 },
        },
      },
      children: [
        ...coverPage(),
        ...chapter1(),
        ...chapter2(),
        ...chapter3(),
        ...chapter4(),
        ...chapter5(),
        ...chapter6(),
        ...chapter7(),
        ...chapter8(),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("./DRF_api_view_learning_notes.docx", buf);
  console.log("Done");
});
