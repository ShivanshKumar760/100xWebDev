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
  LevelFormat,
  BorderStyle,
  WidthType,
  ShadingType,
  PageNumber,
  PageBreak,
  TabStopType,
  TabStopPosition,
  ExternalHyperlink,
} = require("docx");
const fs = require("fs");

// ── helpers ──────────────────────────────────────────────────────────────────
const CONTENT_W = 9360; // 8.5" letter – 2×1" margins in DXA
const COL2 = CONTENT_W / 2;

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NIL, size: 0, color: "FFFFFF" };
const noBorders = {
  top: noBorder,
  bottom: noBorder,
  left: noBorder,
  right: noBorder,
};

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 36,
        font: "Arial",
        color: "1a1a2e",
      }),
    ],
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 160 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28,
        font: "Arial",
        color: "16213e",
      }),
    ],
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        font: "Arial",
        color: "0f3460",
      }),
    ],
  });
}
function h4(text) {
  return new Paragraph({
    spacing: { before: 180, after: 80 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        font: "Arial",
        color: "533483",
      }),
    ],
  });
}
function p(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: [new TextRun({ text, size: 22, font: "Arial", ...opts })],
  });
}
function pRuns(runs) {
  return new Paragraph({
    spacing: { before: 80, after: 120 },
    children: runs.map((r) => {
      if (typeof r === "string")
        return new TextRun({ text: r, size: 22, font: "Arial" });
      return new TextRun({ size: 22, font: "Arial", ...r });
    }),
  });
}
function note(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { left: 360 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: "0f3460", space: 10 },
    },
    children: [
      new TextRun({
        text: "📝 " + text,
        size: 20,
        font: "Arial",
        italics: true,
        color: "333333",
      }),
    ],
  });
}
function warn(text) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    indent: { left: 360 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 12, color: "e63946", space: 10 },
    },
    children: [
      new TextRun({
        text: "⚠️  " + text,
        size: 20,
        font: "Arial",
        italics: true,
        color: "6b0000",
      }),
    ],
  });
}
function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })],
  });
}
function numbered(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "numbers", level },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial" })],
  });
}
function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "dddddd", space: 1 },
    },
    children: [new TextRun("")],
  });
}
function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}
function empty(n = 1) {
  return Array.from(
    { length: n },
    () => new Paragraph({ children: [new TextRun("")] })
  );
}

// Code block — monospace table
function code(lines) {
  const textLines = Array.isArray(lines) ? lines : lines.split("\n");
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    margins: { top: 80, bottom: 80 },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            shading: { fill: "f0f4f8", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            width: { size: CONTENT_W, type: WidthType.DXA },
            children: textLines.map(
              (line) =>
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  children: [
                    new TextRun({
                      text: line === "" ? " " : line,
                      font: "Courier New",
                      size: 18,
                      color: "1a1a2e",
                    }),
                  ],
                })
            ),
          }),
        ],
      }),
    ],
  });
}

// Inline code
function ic(text) {
  return new TextRun({
    text,
    font: "Courier New",
    size: 20,
    color: "0f3460",
    shading: { fill: "eef2ff", type: ShadingType.CLEAR },
  });
}

// Two-column comparison table
function compareTable(
  leftHeader,
  rightHeader,
  leftLines,
  rightLines,
  lColor = "dbeafe",
  rColor = "dcfce7"
) {
  const maxRows = Math.max(leftLines.length, rightLines.length);
  const dataRows = Array.from(
    { length: maxRows },
    (_, i) =>
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: COL2, type: WidthType.DXA },
            shading: { fill: lColor, type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: leftLines[i] || "",
                    font: "Courier New",
                    size: 17,
                    color: "1e3a5f",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders,
            width: { size: COL2, type: WidthType.DXA },
            shading: { fill: rColor, type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: rightLines[i] || "",
                    font: "Courier New",
                    size: 17,
                    color: "14532d",
                  }),
                ],
              }),
            ],
          }),
        ],
      })
  );
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [COL2, COL2],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          new TableCell({
            borders,
            width: { size: COL2, type: WidthType.DXA },
            shading: { fill: "1e3a5f", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: leftHeader,
                    font: "Arial",
                    size: 22,
                    bold: true,
                    color: "ffffff",
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            borders,
            width: { size: COL2, type: WidthType.DXA },
            shading: { fill: "14532d", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: rightHeader,
                    font: "Arial",
                    size: 22,
                    bold: true,
                    color: "ffffff",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      ...dataRows,
    ],
  });
}

// Simple info table
function infoTable(rows) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [3000, CONTENT_W - 3000],
    rows: rows.map(
      ([k, v]) =>
        new TableRow({
          children: [
            new TableCell({
              borders,
              width: { size: 3000, type: WidthType.DXA },
              shading: { fill: "e8eaf6", type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: k,
                      font: "Courier New",
                      size: 19,
                      bold: true,
                      color: "283593",
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              borders,
              width: { size: CONTENT_W - 3000, type: WidthType.DXA },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: v,
                      font: "Arial",
                      size: 20,
                      color: "222222",
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
    ),
  });
}

// ── DOCUMENT CONTENT ─────────────────────────────────────────────────────────
const children = [
  // ═══════════════════════════════════════════════════════
  // COVER PAGE
  // ═══════════════════════════════════════════════════════
  new Paragraph({
    spacing: { before: 1200, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Django REST Framework",
        bold: true,
        size: 64,
        font: "Arial",
        color: "0f3460",
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Complete Developer Guide",
        size: 44,
        font: "Arial",
        color: "533483",
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 0, after: 600 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Database · ORM · Migrations · ViewSets · APIViews · JWT · Docker · Kubernetes",
        size: 22,
        font: "Arial",
        color: "555555",
        italics: true,
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 400, after: 0 },
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "0f3460", space: 1 },
    },
    children: [
      new TextRun({
        text: "From zero to production — everything in one place",
        size: 22,
        font: "Arial",
        color: "333333",
      }),
    ],
  }),
  pageBreak(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 1 — PROJECT SETUP & DATABASE
  // ═══════════════════════════════════════════════════════
  h1("Chapter 1 — Project Setup & Database Configuration"),
  p(
    "Every Django REST API starts with the same foundation: installing packages, creating the project, and wiring up a database. This chapter builds that foundation step by step."
  ),

  h2("1.1  Installing Django and DRF"),
  p(
    "Create a virtual environment first — this keeps your project dependencies isolated from your system Python."
  ),
  code([
    "# 1. Create and activate a virtual environment",
    "python -m venv venv",
    "source venv/bin/activate          # Linux / macOS",
    "venv\\Scripts\\activate             # Windows",
    "",
    "# 2. Install Django and Django REST Framework",
    "pip install django djangorestframework",
    "",
    "# 3. Install JWT library",
    "pip install djangorestframework-simplejwt",
    "",
    "# 4. Save dependencies",
    "pip freeze > requirements.txt",
  ]),

  h2("1.2  Creating the Django Project"),
  code([
    "# Creates the outer project folder and manage.py",
    "django-admin startproject bookstore .",
    "",
    "# Creates the books app",
    "python manage.py startapp books",
  ]),
  p(
    "The dot (.) at the end of startproject puts manage.py in the current directory instead of a nested folder. This is the standard layout for containerised apps."
  ),

  h2("1.3  settings.py — Registering Apps"),
  p("Open bookstore/settings.py and add your apps to INSTALLED_APPS:"),
  code([
    "INSTALLED_APPS = [",
    "    'django.contrib.admin',",
    "    'django.contrib.auth',",
    "    'django.contrib.contenttypes',",
    "    'django.contrib.sessions',",
    "    'django.contrib.messages',",
    "    'django.contrib.staticfiles',",
    "",
    "    'rest_framework',                   # ← DRF",
    "    'rest_framework_simplejwt',         # ← JWT",
    "    'books',                            # ← your app",
    "]",
  ]),
  note(
    "Every app you create with startapp must be listed here or Django will not discover its models, migrations, or admin registration."
  ),

  h2("1.4  Configuring the Database"),
  p(
    "Django supports SQLite (default), PostgreSQL, MySQL, and more. Configuration lives in the DATABASES dict."
  ),

  h3("SQLite (default — no extra install needed)"),
  code([
    "DATABASES = {",
    "    'default': {",
    "        'ENGINE': 'django.db.backends.sqlite3',",
    "        'NAME': BASE_DIR / 'db.sqlite3',",
    "    }",
    "}",
  ]),

  h3("PostgreSQL"),
  code([
    "pip install psycopg2-binary",
    "",
    "# settings.py",
    "DATABASES = {",
    "    'default': {",
    "        'ENGINE': 'django.db.backends.postgresql',",
    "        'NAME': 'mydb',",
    "        'USER': 'postgres',",
    "        'PASSWORD': 'secret',",
    "        'HOST': 'localhost',",
    "        'PORT': '5432',",
    "    }",
    "}",
  ]),
  note(
    "For production, always use environment variables instead of hardcoding credentials. Use python-decouple or os.environ.get()."
  ),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 2 — ORM & MIGRATIONS
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 2 — ORM & Migrations"),
  p(
    "The ORM (Object-Relational Mapper) lets you interact with your database using Python classes instead of writing SQL. Migrations translate those Python class changes into database schema changes."
  ),

  h2("2.1  Defining a Model"),
  p(
    "A model is a Python class that maps to a database table. Each class attribute becomes a column."
  ),
  code([
    "# books/models.py",
    "from django.db import models",
    "",
    "",
    "class Book(models.Model):",
    "    # CharField → VARCHAR in the database",
    "    title = models.CharField(max_length=255)",
    "    author = models.CharField(max_length=255)",
    "    genre = models.CharField(max_length=100)",
    "",
    "    # PositiveIntegerField → INTEGER (unsigned)",
    "    published_year = models.PositiveIntegerField()",
    "",
    "    # BooleanField → BOOLEAN / TINYINT",
    "    is_available = models.BooleanField(default=True)",
    "",
    "    # auto_now_add → set once on creation, never updated",
    "    # auto_now    → updated on every save()",
    "    created_at = models.DateTimeField(auto_now_add=True)",
    "    updated_at = models.DateTimeField(auto_now=True)",
    "",
    "    class Meta:",
    "        ordering = ['-created_at']   # default sort: newest first",
    "        db_table = 'books'           # explicit table name (optional)",
    "",
    "    def __str__(self):",
    '        return f"{self.title} by {self.author}"',
  ]),

  h2("2.2  Common Field Types"),
  infoTable([
    ["CharField", "Short text (requires max_length). Stored as VARCHAR."],
    ["TextField", "Long text (no max_length). Stored as TEXT."],
    [
      "IntegerField",
      "Whole numbers. Variants: SmallIntegerField, BigIntegerField.",
    ],
    [
      "FloatField / DecimalField",
      "Decimal numbers. Use DecimalField for money (specify max_digits, decimal_places).",
    ],
    ["BooleanField", "True / False. Stored as BOOLEAN."],
    [
      "DateTimeField",
      "Date and time. auto_now_add and auto_now are common kwargs.",
    ],
    ["ForeignKey", "Many-to-one relationship. Requires on_delete argument."],
    [
      "ManyToManyField",
      "Many-to-many. Django creates a junction table automatically.",
    ],
    [
      "JSONField",
      "Store arbitrary JSON. Native in PostgreSQL, emulated elsewhere.",
    ],
    ["ImageField / FileField", "File upload fields. Require MEDIA settings."],
  ]),

  h2("2.3  ForeignKey — Relationships"),
  code([
    "# One author can write many books",
    "class Author(models.Model):",
    "    name = models.CharField(max_length=200)",
    "",
    "class Book(models.Model):",
    "    author = models.ForeignKey(",
    "        Author,",
    "        on_delete=models.CASCADE,    # delete books when author is deleted",
    "        related_name='books',        # author_instance.books.all()",
    "    )",
    "",
    "# on_delete options:",
    "# CASCADE     → delete child records",
    "# PROTECT     → raise an error (prevent deletion)",
    "# SET_NULL    → set FK to NULL (field must have null=True)",
    "# SET_DEFAULT → set to field default",
    "# DO_NOTHING  → no action (risky — can break integrity)",
  ]),

  h2("2.4  Migrations — The Full Workflow"),
  p(
    "Migrations are version-controlled snapshots of your database schema. You run two commands:"
  ),
  code([
    "# Step 1: Generate migration files from your model changes",
    "python manage.py makemigrations",
    "",
    "# Step 2: Apply those migrations to the actual database",
    "python manage.py migrate",
    "",
    "# Useful extras:",
    "python manage.py showmigrations          # list all migrations and status",
    "python manage.py sqlmigrate books 0001   # show the SQL that will run",
    "python manage.py migrate books 0002      # migrate to a specific version",
    "python manage.py migrate books zero      # roll back ALL books migrations",
  ]),
  note(
    "Always commit migration files to version control. They are part of your codebase — not generated files."
  ),

  h2("2.5  ORM Query Cheatsheet"),
  p(
    "Django's ORM lets you build SQL queries by chaining Python method calls. Queries are lazy — they do not hit the database until you actually use the data."
  ),
  code([
    "# CREATE",
    'book = Book.objects.create(title="Clean Code", author="Martin", published_year=2008)',
    "",
    "# READ — all",
    "books = Book.objects.all()",
    "",
    "# READ — filter (WHERE clause)",
    "available = Book.objects.filter(is_available=True)",
    'tech = Book.objects.filter(genre__icontains="tech")   # case-insensitive LIKE',
    "",
    "# READ — single record",
    "book = Book.objects.get(id=1)          # raises DoesNotExist if not found",
    "book = Book.objects.filter(id=1).first()  # returns None if not found",
    "",
    "# READ — ordering, slicing",
    "books = Book.objects.order_by('-published_year')[:10]  # top 10 newest",
    "",
    "# UPDATE",
    "Book.objects.filter(id=1).update(is_available=False)",
    "",
    "# UPDATE a single instance",
    "book = Book.objects.get(id=1)",
    'book.title = "New Title"',
    "book.save()",
    "",
    "# DELETE",
    "Book.objects.filter(is_available=False).delete()",
    "",
    "# COUNT, EXISTS",
    "total = Book.objects.count()",
    'exists = Book.objects.filter(author="Martin").exists()',
    "",
    "# SELECT RELATED — avoid N+1 queries",
    'books = Book.objects.select_related("author").all()',
    'books = Book.objects.prefetch_related("tags").all()',
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 3 — SERIALIZERS
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 3 — Serializers"),
  p(
    "A serializer converts Python objects (model instances, querysets) to JSON for API responses, and validates + converts incoming JSON back into Python objects for writes. It is the bridge between your database layer and your HTTP layer."
  ),

  h2("3.1  ModelSerializer"),
  code([
    "# books/serializers.py",
    "from rest_framework import serializers",
    "from books.models import Book",
    "",
    "",
    "class BookSerializer(serializers.ModelSerializer):",
    "    class Meta:",
    "        model = Book",
    "        fields = [",
    "            'id',",
    "            'title',",
    "            'author',",
    "            'genre',",
    "            'published_year',",
    "            'is_available',",
    "            'created_at',",
    "            'updated_at',",
    "        ]",
    "        read_only_fields = ['id', 'created_at', 'updated_at']",
  ]),
  pRuns([
    "Use ",
    ic("fields = '__all__'"),
    " to include every model field automatically — but explicit lists are safer in production.",
  ]),

  h2("3.2  Custom Validation"),
  code([
    "class BookSerializer(serializers.ModelSerializer):",
    "    class Meta:",
    "        model = Book",
    "        fields = '__all__'",
    "",
    "    # Field-level validation — method name: validate_<fieldname>",
    "    def validate_published_year(self, value):",
    "        if value < 1000 or value > 2100:",
    "            raise serializers.ValidationError(",
    '                "Year must be between 1000 and 2100."',
    "            )",
    "        return value",
    "",
    "    # Object-level validation — runs after all field validators",
    "    def validate(self, data):",
    '        if data["is_available"] and not data.get("published_year"):',
    "            raise serializers.ValidationError(",
    '                "Available books must have a published year."',
    "            )",
    "        return data",
  ]),

  h2("3.3  How create() and update() Work"),
  p(
    "When you call serializer.save(), DRF calls create() if there is no instance, or update() if there is. ModelSerializer generates these automatically, but you can override them."
  ),
  code([
    "    def create(self, validated_data):",
    "        # Called for POST — no existing instance",
    "        return Book.objects.create(**validated_data)",
    "",
    "    def update(self, instance, validated_data):",
    "        # Called for PUT and PATCH — has existing instance",
    "        # .get(key, instance.key) makes PATCH safe:",
    "        # if the field is missing from the request body,",
    "        # the old value is kept.",
    '        instance.title = validated_data.get("title", instance.title)',
    '        instance.author = validated_data.get("author", instance.author)',
    '        instance.genre = validated_data.get("genre", instance.genre)',
    "        instance.published_year = validated_data.get(",
    '            "published_year", instance.published_year',
    "        )",
    "        instance.is_available = validated_data.get(",
    '            "is_available", instance.is_available',
    "        )",
    "        instance.save()",
    "        return instance",
  ]),

  h2("3.4  Serializer Arguments — What Changes Per Request"),
  infoTable([
    [
      "BookSerializer(queryset, many=True)",
      "GET list — serialize many objects into an array",
    ],
    ["BookSerializer(instance)", "GET detail — serialize one object"],
    [
      "BookSerializer(data=request.data)",
      "POST — validate and create new object",
    ],
    [
      "BookSerializer(instance, data=request.data)",
      "PUT — validate and fully replace object",
    ],
    [
      "BookSerializer(instance, data=request.data, partial=True)",
      "PATCH — validate and partially update",
    ],
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 4 — VIEWSET (V1)
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 4 — ViewSets (api/v1)"),
  p(
    "A ViewSet combines all the views for a resource into a single class. The Router then generates all the URLs automatically. This is the most concise way to build a standard REST API in DRF."
  ),

  h2("4.1  The Inheritance Chain"),
  p(
    "When you write class BookViewSet(viewsets.ModelViewSet), you inherit from a chain of mixins. Each mixin contributes one action:"
  ),
  code([
    "ModelViewSet",
    "  ├── CreateModelMixin       → create()         POST   /books/",
    "  ├── ListModelMixin         → list()            GET    /books/",
    "  ├── RetrieveModelMixin     → retrieve()        GET    /books/{id}/",
    "  ├── UpdateModelMixin       → update()          PUT    /books/{id}/",
    "  │                          → partial_update()  PATCH  /books/{id}/",
    "  ├── DestroyModelMixin      → destroy()         DELETE /books/{id}/",
    "  └── GenericAPIView",
    "        ├── get_queryset()       reads self.queryset",
    "        ├── get_serializer()     reads self.serializer_class",
    "        ├── get_object()         fetches single instance by pk",
    "        └── get_permissions()   reads self.permission_classes",
  ]),

  h2("4.2  What the Router Actually Generates"),
  p(
    "When you register a ViewSet with a Router, it maps HTTP method + URL pattern to a ViewSet action:"
  ),
  infoTable([
    ["GET    /books/", "list()          — BookSerializer(queryset, many=True)"],
    ["POST   /books/", "create()        — BookSerializer(data=request.data)"],
    ["GET    /books/{id}/", "retrieve()      — BookSerializer(instance)"],
    [
      "PUT    /books/{id}/",
      "update()        — BookSerializer(instance, data=request.data)",
    ],
    [
      "PATCH  /books/{id}/",
      "partial_update()— BookSerializer(instance, data=..., partial=True)",
    ],
    ["DELETE /books/{id}/", "destroy()       — instance.delete()"],
    ["GET    /books/available/", "@action custom  — detail=False"],
    ["POST   /books/{id}/publish/", "@action custom  — detail=True"],
  ]),

  h2("4.3  How get_serializer() Works Internally"),
  p(
    "You never call BookSerializer(...) directly. The ViewSet calls get_serializer() which looks up serializer_class and passes the right arguments:"
  ),
  code([
    "# Inside GenericAPIView (DRF source — simplified)",
    "def get_serializer(self, *args, **kwargs):",
    "    serializer_class = self.get_serializer_class()   # → BookSerializer",
    '    kwargs["context"] = self.get_serializer_context()',
    "    return serializer_class(*args, **kwargs)          # → BookSerializer(...)",
    "",
    "# Each action calls get_serializer with different arguments:",
    "",
    "# list()",
    "serializer = self.get_serializer(queryset, many=True)",
    "",
    "# create()",
    "serializer = self.get_serializer(data=request.data)",
    "",
    "# retrieve()",
    "serializer = self.get_serializer(instance)",
    "",
    "# update()   — PUT",
    "serializer = self.get_serializer(instance, data=request.data)",
    "",
    "# partial_update()   — PATCH",
    "serializer = self.get_serializer(instance, data=request.data, partial=True)",
  ]),

  h2("4.4  Complete ViewSet Code"),
  code([
    "# api/v1/views.py",
    "from rest_framework import viewsets, filters",
    "from rest_framework.decorators import action",
    "from rest_framework.response import Response",
    "from rest_framework.permissions import IsAuthenticated",
    "from books.models import Book",
    "from books.serializers import BookSerializer",
    "",
    "",
    "class BookViewSet(viewsets.ModelViewSet):",
    '    """',
    "    Auto-generated endpoints:",
    "        GET     /api/v1/books/",
    "        POST    /api/v1/books/",
    "        GET     /api/v1/books/{id}/",
    "        PUT     /api/v1/books/{id}/",
    "        PATCH   /api/v1/books/{id}/",
    "        DELETE  /api/v1/books/{id}/",
    '    """',
    "    queryset = Book.objects.all()",
    "    serializer_class = BookSerializer",
    "    permission_classes = [IsAuthenticated]          # JWT required",
    "    filter_backends = [filters.SearchFilter, filters.OrderingFilter]",
    "    search_fields = ['title', 'author', 'genre']",
    "    ordering_fields = ['title', 'published_year']",
    "",
    "    # ── Custom action on the COLLECTION (detail=False)",
    "    # URL: GET /api/v1/books/available/",
    "    @action(detail=False, methods=['get'])",
    "    def available(self, request):",
    "        qs = self.get_queryset().filter(is_available=True)",
    "        serializer = self.get_serializer(qs, many=True)",
    '        return Response({"count": qs.count(), "results": serializer.data})',
    "",
    "    # ── Custom action on a SINGLE object (detail=True)",
    "    # URL: POST /api/v1/books/{id}/toggle_availability/",
    "    @action(detail=True, methods=['post'], url_path='toggle_availability')",
    "    def toggle_availability(self, request, pk=None):",
    "        book = self.get_object()    # handles 404 automatically",
    "        book.is_available = not book.is_available",
    "        book.save()",
    "        return Response({",
    '            "id": book.id,',
    '            "is_available": book.is_available,',
    "        })",
  ]),

  h2("4.5  Router URLs"),
  code([
    "# api/v1/urls.py",
    "from rest_framework.routers import DefaultRouter",
    "from api.v1.views import BookViewSet",
    "",
    "router = DefaultRouter()",
    "router.register(r'books', BookViewSet, basename='v1-book')",
    "",
    "# router.urls generates ALL the paths above automatically",
    "urlpatterns = router.urls",
  ]),

  h2("4.6  Restricting Actions — Read-Only ViewSet"),
  code([
    "# Only allow GET /books/ and GET /books/{id}/",
    "class BookViewSet(viewsets.ReadOnlyModelViewSet):",
    "    queryset = Book.objects.all()",
    "    serializer_class = BookSerializer",
    "",
    "# Or pick specific actions from ModelViewSet:",
    "from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin",
    "from rest_framework.viewsets import GenericViewSet",
    "",
    "class BookViewSet(ListModelMixin, RetrieveModelMixin, CreateModelMixin, GenericViewSet):",
    "    # GET list + GET detail + POST only. No PUT, PATCH, DELETE.",
    "    queryset = Book.objects.all()",
    "    serializer_class = BookSerializer",
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 5 — APIVIEW (V2)
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 5 — APIView (api/v2)"),
  p(
    "APIView gives you full manual control. You write a class, define methods named after HTTP verbs (get, post, put, patch, delete), and map URLs manually. More verbose, but clearer — you can see exactly what happens for each request."
  ),

  h2("5.1  How Django Routes a Request"),
  p("Two things together determine what code runs:"),
  code([
    "Step 1: URL matches → selects the CLASS",
    '  path("books/",        BookListCreateView.as_view())',
    '  path("books/<int:pk>/", BookDetailView.as_view())',
    "",
    "Step 2: HTTP method → selects the METHOD inside the class",
    "  GET  request → .get()",
    "  POST request → .post()",
    "  PUT  request → .put()",
    "  ...and so on",
    "",
    "A method not defined in the class → DRF returns 405 Method Not Allowed",
  ]),

  h2("5.2  BookListCreateView — GET + POST"),
  code([
    "# api/v2/views.py",
    "from django.http import Http404",
    "from rest_framework.views import APIView",
    "from rest_framework.response import Response",
    "from rest_framework import status",
    "from rest_framework.permissions import IsAuthenticated",
    "from books.models import Book",
    "from books.serializers import BookSerializer",
    "",
    "",
    "class BookListCreateView(APIView):",
    '    """',
    "    GET  /api/v2/books/  → list all books",
    "    POST /api/v2/books/  → create a new book",
    '    """',
    "    permission_classes = [IsAuthenticated]",
    "",
    "    def get(self, request):",
    "        # Manually fetch and serialize all books",
    "        queryset = Book.objects.all()",
    "",
    "        # Manual search support",
    '        search = request.query_params.get("search")',
    "        if search:",
    "            queryset = queryset.filter(title__icontains=search)",
    "",
    "        serializer = BookSerializer(queryset, many=True)",
    "        return Response({",
    '            "count": queryset.count(),',
    '            "results": serializer.data,',
    "        }, status=status.HTTP_200_OK)",
    "",
    "    def post(self, request):",
    "        # Validate incoming JSON and create",
    "        serializer = BookSerializer(data=request.data)",
    "        if serializer.is_valid():",
    "            serializer.save()",
    "            return Response(serializer.data, status=status.HTTP_201_CREATED)",
    "        # Return validation errors to the client",
    "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
  ]),

  h2("5.3  BookDetailView — GET + PUT + PATCH + DELETE"),
  code([
    "class BookDetailView(APIView):",
    '    """',
    "    GET    /api/v2/books/{id}/ → retrieve",
    "    PUT    /api/v2/books/{id}/ → full update",
    "    PATCH  /api/v2/books/{id}/ → partial update",
    "    DELETE /api/v2/books/{id}/ → delete",
    '    """',
    "    permission_classes = [IsAuthenticated]",
    "",
    "    def get_object(self, pk):",
    '        """Shared helper — fetch book or raise 404."""',
    "        try:",
    "            return Book.objects.get(pk=pk)",
    "        except Book.DoesNotExist:",
    "            raise Http404",
    "",
    "    def get(self, request, pk):",
    "        book = self.get_object(pk)",
    "        serializer = BookSerializer(book)",
    "        return Response(serializer.data)",
    "",
    "    def put(self, request, pk):",
    "        book = self.get_object(pk)",
    "        # partial=False → ALL fields required in body",
    "        serializer = BookSerializer(book, data=request.data)",
    "        if serializer.is_valid():",
    "            serializer.save()",
    "            return Response(serializer.data)",
    "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
    "",
    "    def patch(self, request, pk):",
    "        book = self.get_object(pk)",
    "        # partial=True → only provided fields are validated",
    "        serializer = BookSerializer(book, data=request.data, partial=True)",
    "        if serializer.is_valid():",
    "            serializer.save()",
    "            return Response(serializer.data)",
    "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
    "",
    "    def delete(self, request, pk):",
    "        book = self.get_object(pk)",
    "        book.delete()",
    "        return Response(",
    '            {"message": f"Book {pk} deleted."},',
    "            status=status.HTTP_204_NO_CONTENT",
    "        )",
  ]),

  h2("5.4  Manual URLs"),
  code([
    "# api/v2/urls.py",
    "from django.urls import path",
    "from api.v2.views import (",
    "    BookListCreateView,",
    "    BookDetailView,",
    "    BookAvailableView,",
    "    BookToggleAvailabilityView,",
    ")",
    "",
    "# IMPORTANT: static paths before dynamic paths",
    "urlpatterns = [",
    "    path('books/',           BookListCreateView.as_view(),   name='v2-list'),",
    "    path('books/available/', BookAvailableView.as_view(),    name='v2-available'),",
    "    path('books/<int:pk>/',  BookDetailView.as_view(),       name='v2-detail'),",
    "    path('books/<int:pk>/toggle_availability/',",
    '         BookToggleAvailabilityView.as_view(), name="v2-toggle"),',
    "]",
  ]),
  warn(
    "Put static paths (books/available/) BEFORE dynamic paths (books/<int:pk>/) — otherwise Django matches the static segment as a pk value and routes to the wrong view."
  ),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 6 — @api_view DECORATOR
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 6 — @api_view Decorator (Function-Based Views)"),
  p(
    "The @api_view decorator wraps a plain Python function and gives it DRF superpowers: request parsing, content negotiation, authentication, permission checking, and response rendering. It is the simplest way to write a single endpoint."
  ),

  h2("6.1  Basic Syntax"),
  code([
    "from rest_framework.decorators import api_view",
    "from rest_framework.response import Response",
    "from rest_framework import status",
    "",
    "# The list passed to @api_view declares which HTTP methods are allowed.",
    "# Any other method → 405 Method Not Allowed automatically.",
    "# @api_view(['GET', 'POST'])",
    "",
    "@api_view(['GET', 'POST'])",
    "def book_list(request):",
    '    if request.method == "GET":',
    "        books = Book.objects.all()",
    "        serializer = BookSerializer(books, many=True)",
    "        return Response(serializer.data)",
    "",
    '    if request.method == "POST":',
    "        serializer = BookSerializer(data=request.data)",
    "        if serializer.is_valid():",
    "            serializer.save()",
    "            return Response(serializer.data, status=status.HTTP_201_CREATED)",
    "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
  ]),

  h2("6.2  Detail Endpoint"),
  code([
    "@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])",
    "def book_detail(request, pk):",
    "    try:",
    "        book = Book.objects.get(pk=pk)",
    "    except Book.DoesNotExist:",
    '        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)',
    "",
    '    if request.method == "GET":',
    "        serializer = BookSerializer(book)",
    "        return Response(serializer.data)",
    "",
    '    if request.method in ("PUT", "PATCH"):',
    '        partial = request.method == "PATCH"',
    "        serializer = BookSerializer(book, data=request.data, partial=partial)",
    "        if serializer.is_valid():",
    "            serializer.save()",
    "            return Response(serializer.data)",
    "        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)",
    "",
    '    if request.method == "DELETE":',
    "        book.delete()",
    "        return Response(status=status.HTTP_204_NO_CONTENT)",
  ]),

  h2("6.3  Adding Authentication and Permissions"),
  code([
    "from rest_framework.decorators import api_view, authentication_classes, permission_classes",
    "from rest_framework.permissions import IsAuthenticated",
    "from rest_framework_simplejwt.authentication import JWTAuthentication",
    "",
    "@api_view(['GET'])",
    "@authentication_classes([JWTAuthentication])",
    "@permission_classes([IsAuthenticated])",
    "def protected_view(request):",
    '    return Response({"message": f"Hello, {request.user.username}!"})',
  ]),

  h2("6.4  @api_view vs APIView vs ViewSet"),
  compareTable(
    "@api_view (Function)",
    "APIView (Class)",
    [
      "Function with decorator",
      "Simple if/elif on method",
      "Good for one-off endpoints",
      "No inheritance",
      "Least boilerplate for 1 endpoint",
      "Harder to reuse logic",
      "",
      "Example:",
      '@api_view(["GET", "POST"])',
      "def books(request): ...",
    ],
    [
      "Class inheriting APIView",
      "Separate method per HTTP verb",
      "Good for standard endpoints",
      "Can use mixins",
      "Clean separation of methods",
      "Easy to share helpers",
      "",
      "Example:",
      "class BookList(APIView):",
      "    def get(self): ...",
    ]
  ),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 7 — JWT AUTHENTICATION
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 7 — JWT Authentication"),
  p(
    "JWT (JSON Web Token) is the standard way to authenticate REST API requests. The client logs in once, receives a token, and sends that token with every subsequent request. The server verifies the token without needing to hit the database."
  ),

  h2("7.1  How JWT Works"),
  code([
    "1. Client sends:  POST /api/token/  { username, password }",
    '2. Server responds: { access: "eyJ...", refresh: "eyJ..." }',
    "",
    "3. Client stores both tokens.",
    "",
    "4. For every API call, client sends:",
    "   Authorization: Bearer eyJ...<access_token>",
    "",
    "5. Access token expires (default: 5 min).",
    '   Client sends: POST /api/token/refresh/ { refresh: "eyJ..." }',
    '   Server responds: { access: "eyJ...<new_access_token>" }',
    "",
    "6. Refresh token expires (default: 1 day) → user must log in again.",
  ]),

  h2("7.2  Installation & Settings"),
  code([
    "pip install djangorestframework-simplejwt",
    "",
    "# settings.py",
    "from datetime import timedelta",
    "",
    "REST_FRAMEWORK = {",
    '    "DEFAULT_AUTHENTICATION_CLASSES": [',
    '        "rest_framework_simplejwt.authentication.JWTAuthentication",',
    "    ],",
    '    "DEFAULT_PERMISSION_CLASSES": [',
    '        "rest_framework.permissions.IsAuthenticated",',
    "    ],",
    "}",
    "",
    "SIMPLE_JWT = {",
    '    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),',
    '    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),',
    '    "ROTATE_REFRESH_TOKENS": True,    # issue new refresh on each refresh call',
    '    "BLACKLIST_AFTER_ROTATION": True, # old refresh can never be reused',
    '    "AUTH_HEADER_TYPES": ("Bearer",),',
    "}",
  ]),

  h2("7.3  JWT URLs"),
  code([
    "# bookstore/urls.py",
    "from django.urls import path, include",
    "from rest_framework_simplejwt.views import (",
    "    TokenObtainPairView,    # POST /api/token/",
    "    TokenRefreshView,       # POST /api/token/refresh/",
    "    TokenVerifyView,        # POST /api/token/verify/",
    ")",
    "",
    "urlpatterns = [",
    "    path('admin/',                   admin.site.urls),",
    "    path('api/token/',               TokenObtainPairView.as_view()),",
    "    path('api/token/refresh/',       TokenRefreshView.as_view()),",
    "    path('api/token/verify/',        TokenVerifyView.as_view()),",
    "    path('api/v1/',                  include('api.v1.urls')),",
    "    path('api/v2/',                  include('api.v2.urls')),",
    "]",
  ]),

  h2("7.4  Protecting Views"),
  code([
    "# Option 1: Global — protects ALL endpoints (in settings.py)",
    "REST_FRAMEWORK = {",
    '    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"]',
    "}",
    "",
    "# Option 2: Per-ViewSet",
    "class BookViewSet(viewsets.ModelViewSet):",
    "    permission_classes = [IsAuthenticated]",
    "",
    "# Option 3: Per-APIView",
    "class BookListView(APIView):",
    "    permission_classes = [IsAuthenticated]",
    "",
    "# Option 4: Per @api_view function",
    "@api_view(['GET'])",
    "@permission_classes([IsAuthenticated])",
    "def my_view(request): ...",
    "",
    "# Option 5: Public endpoint inside a protected ViewSet",
    "from rest_framework.permissions import AllowAny",
    "",
    "class BookViewSet(viewsets.ModelViewSet):",
    "    permission_classes = [IsAuthenticated]",
    "",
    "    @action(detail=False, methods=['get'], permission_classes=[AllowAny])",
    "    def public_list(self, request):",
    "        # This one action is publicly accessible",
    "        ...",
  ]),

  h2("7.5  Custom Token Payload"),
  code([
    "# Add extra fields (e.g. username, email) to the JWT payload",
    "from rest_framework_simplejwt.serializers import TokenObtainPairSerializer",
    "from rest_framework_simplejwt.views import TokenObtainPairView",
    "",
    "class MyTokenSerializer(TokenObtainPairSerializer):",
    "    @classmethod",
    "    def get_token(cls, user):",
    "        token = super().get_token(user)",
    "        # Add custom claims",
    "        token['username'] = user.username",
    "        token['email'] = user.email",
    "        token['is_staff'] = user.is_staff",
    "        return token",
    "",
    "class MyTokenView(TokenObtainPairView):",
    "    serializer_class = MyTokenSerializer",
    "",
    "# Use MyTokenView instead of TokenObtainPairView in urls.py",
  ]),

  h2("7.6  Testing JWT with curl"),
  code([
    "# 1. Get tokens",
    "curl -X POST http://localhost:8000/api/token/ \\",
    '     -H "Content-Type: application/json" \\',
    '     -d \'{"username": "admin", "password": "secret"}\'',
    "",
    "# Response:",
    '# { "access": "eyJhbGc...", "refresh": "eyJhbGc..." }',
    "",
    "# 2. Use access token in a request",
    "curl http://localhost:8000/api/v1/books/ \\",
    '     -H "Authorization: Bearer eyJhbGc..."',
    "",
    "# 3. Refresh the access token",
    "curl -X POST http://localhost:8000/api/token/refresh/ \\",
    '     -H "Content-Type: application/json" \\',
    '     -d \'{"refresh": "eyJhbGc..."}\'',
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 8 — COMPLETE CRUD APP
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 8 — Complete CRUD App with SQLite & JWT"),
  p(
    "This chapter presents every file of the complete bookstore project, ready to run."
  ),

  h2("8.1  Project Structure"),
  code([
    "bookstore/",
    "├── bookstore/",
    "│   ├── settings.py",
    "│   └── urls.py",
    "├── books/",
    "│   ├── models.py",
    "│   ├── serializers.py",
    "│   └── admin.py",
    "├── api/",
    "│   ├── v1/",
    "│   │   ├── views.py     ← ViewSet",
    "│   │   └── urls.py      ← Router",
    "│   └── v2/",
    "│       ├── views.py     ← APIView",
    "│       └── urls.py      ← Manual paths",
    "├── manage.py",
    "└── requirements.txt",
  ]),

  h2("8.2  requirements.txt"),
  code([
    "django>=4.2",
    "djangorestframework>=3.14",
    "djangorestframework-simplejwt>=5.3",
    "gunicorn>=21.2",
  ]),

  h2("8.3  settings.py (Key Sections)"),
  code([
    "from pathlib import Path",
    "from datetime import timedelta",
    "",
    "BASE_DIR = Path(__file__).resolve().parent.parent",
    "SECRET_KEY = 'change-me-in-production'",
    "DEBUG = True",
    "ALLOWED_HOSTS = ['*']",
    "",
    "INSTALLED_APPS = [",
    "    'django.contrib.admin', 'django.contrib.auth',",
    "    'django.contrib.contenttypes', 'django.contrib.sessions',",
    "    'django.contrib.messages', 'django.contrib.staticfiles',",
    "    'rest_framework', 'rest_framework_simplejwt', 'books',",
    "]",
    "",
    "DATABASES = {",
    "    'default': {'ENGINE': 'django.db.backends.sqlite3',",
    "                'NAME': BASE_DIR / 'db.sqlite3'}",
    "}",
    "",
    "REST_FRAMEWORK = {",
    '    "DEFAULT_AUTHENTICATION_CLASSES": [',
    '        "rest_framework_simplejwt.authentication.JWTAuthentication",',
    "    ],",
    '    "DEFAULT_PERMISSION_CLASSES": [',
    '        "rest_framework.permissions.IsAuthenticated",',
    "    ],",
    "}",
    "",
    "SIMPLE_JWT = {",
    '    "ACCESS_TOKEN_LIFETIME":  timedelta(minutes=30),',
    '    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),',
    '    "ROTATE_REFRESH_TOKENS": True,',
    "}",
  ]),

  h2("8.4  bookstore/urls.py"),
  code([
    "from django.contrib import admin",
    "from django.urls import path, include",
    "from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView",
    "",
    "urlpatterns = [",
    "    path('admin/',                 admin.site.urls),",
    "    path('api/token/',             TokenObtainPairView.as_view()),",
    "    path('api/token/refresh/',     TokenRefreshView.as_view()),",
    "    path('api/v1/',                include('api.v1.urls')),",
    "    path('api/v2/',                include('api.v2.urls')),",
    "]",
  ]),

  h2("8.5  Running It"),
  code([
    "python manage.py makemigrations",
    "python manage.py migrate",
    "python manage.py createsuperuser",
    "python manage.py runserver",
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 9 — DOCKER
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 9 — Dockerising the Application"),
  p(
    "Docker packages your application and all its dependencies into a portable container image. The image runs identically on any machine — your laptop, a CI server, or a Kubernetes cluster."
  ),

  h2("9.1  Dockerfile"),
  code([
    "# Dockerfile",
    "# ── Stage: production image ──────────────────────────────────────",
    "FROM python:3.11-slim",
    "",
    "# Prevent Python from writing .pyc files",
    "ENV PYTHONDONTWRITEBYTECODE=1",
    "# Prevent Python from buffering stdout/stderr",
    "ENV PYTHONUNBUFFERED=1",
    "",
    "WORKDIR /app",
    "",
    "# Install dependencies first (layer cached unless requirements change)",
    "COPY requirements.txt .",
    "RUN pip install --no-cache-dir -r requirements.txt",
    "",
    "# Copy application code",
    "COPY . .",
    "",
    "# Collect static files",
    "RUN python manage.py collectstatic --noinput",
    "",
    "# Expose the port gunicorn will listen on",
    "EXPOSE 8000",
    "",
    "# Start gunicorn (production WSGI server)",
    'CMD ["gunicorn", "bookstore.wsgi:application",',
    '     "--bind", "0.0.0.0:8000",',
    '     "--workers", "3"]',
  ]),

  h2("9.2  .dockerignore"),
  code([
    "__pycache__",
    "*.pyc",
    "*.pyo",
    ".env",
    "db.sqlite3",
    ".git",
    ".gitignore",
    "venv/",
    "*.md",
  ]),

  h2("9.3  docker-compose.yml"),
  code([
    "# docker-compose.yml",
    'version: "3.9"',
    "",
    "services:",
    "  web:",
    "    build: .",
    "    command: >",
    '      sh -c "python manage.py migrate &&',
    "             gunicorn bookstore.wsgi:application",
    '             --bind 0.0.0.0:8000 --workers 3"',
    "    volumes:",
    "      - .:/app",
    "    ports:",
    '      - "8000:8000"',
    "    environment:",
    "      - DEBUG=0",
    "      - SECRET_KEY=your-secret-key",
    "      - DATABASE_URL=sqlite:///db.sqlite3",
  ]),

  h2("9.4  Build and Run"),
  code([
    "# Build the image",
    "docker build -t bookstore-api .",
    "",
    "# Run a single container",
    "docker run -p 8000:8000 bookstore-api",
    "",
    "# Or use docker-compose (recommended)",
    "docker-compose up --build",
    "",
    "# Run in background",
    "docker-compose up -d",
    "",
    "# View logs",
    "docker-compose logs -f web",
    "",
    "# Run Django management commands inside the container",
    "docker-compose exec web python manage.py createsuperuser",
    "docker-compose exec web python manage.py migrate",
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 10 — KUBERNETES
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 10 — Deploying on Kubernetes"),
  p(
    "Kubernetes (K8s) is a container orchestration platform. It runs your Docker image across multiple servers, handles restarts, scales up under load, and provides a stable network address for your app."
  ),

  h2("10.1  Core Concepts"),
  infoTable([
    [
      "Pod",
      "The smallest deployable unit. Wraps one or more containers. Ephemeral — can be replaced at any time.",
    ],
    [
      "Deployment",
      "Declares how many Pod replicas to run, which image to use, and update strategy. K8s reconciles reality to match.",
    ],
    [
      "Service",
      "A stable network endpoint (IP + DNS name) that load-balances across all matching Pods.",
    ],
    [
      "Ingress",
      "HTTP routing rules. Maps hostnames and paths to Services. Needs an Ingress Controller (nginx, traefik, etc.)",
    ],
    [
      "ConfigMap",
      "Key-value store for non-secret configuration (environment variables, config files).",
    ],
    [
      "Secret",
      "Like ConfigMap but base64-encoded. For passwords, tokens, TLS certs.",
    ],
    [
      "Namespace",
      "Virtual cluster within a cluster. Used to isolate environments (dev, staging, prod).",
    ],
  ]),

  h2("10.2  Namespace"),
  code([
    "# k8s/namespace.yaml",
    "apiVersion: v1",
    "kind: Namespace",
    "metadata:",
    "  name: bookstore",
  ]),

  h2("10.3  ConfigMap"),
  code([
    "# k8s/configmap.yaml",
    "apiVersion: v1",
    "kind: ConfigMap",
    "metadata:",
    "  name: bookstore-config",
    "  namespace: bookstore",
    "data:",
    '  DEBUG: "0"',
    '  ALLOWED_HOSTS: "*"',
    '  DATABASE_URL: "sqlite:////data/db.sqlite3"',
  ]),

  h2("10.4  Secret"),
  code([
    "# Generate base64 value:",
    '# echo -n "my-super-secret-key" | base64',
    "",
    "# k8s/secret.yaml",
    "apiVersion: v1",
    "kind: Secret",
    "metadata:",
    "  name: bookstore-secret",
    "  namespace: bookstore",
    "type: Opaque",
    "data:",
    "  SECRET_KEY: bXktc3VwZXItc2VjcmV0LWtleQ==   # base64 encoded",
  ]),

  h2("10.5  Deployment"),
  code([
    "# k8s/deployment.yaml",
    "apiVersion: apps/v1",
    "kind: Deployment",
    "metadata:",
    "  name: bookstore-api",
    "  namespace: bookstore",
    "spec:",
    "  replicas: 3",
    "  selector:",
    "    matchLabels:",
    "      app: bookstore-api",
    "  template:",
    "    metadata:",
    "      labels:",
    "        app: bookstore-api",
    "    spec:",
    "      containers:",
    "        - name: api",
    "          image: bookstore-api:latest",
    "          imagePullPolicy: IfNotPresent",
    "          ports:",
    "            - containerPort: 8000",
    "          envFrom:",
    "            - configMapRef:",
    "                name: bookstore-config",
    "            - secretRef:",
    "                name: bookstore-secret",
    "          resources:",
    "            requests:",
    '              memory: "128Mi"',
    '              cpu: "100m"',
    "            limits:",
    '              memory: "512Mi"',
    '              cpu: "500m"',
    "          livenessProbe:",
    "            httpGet:",
    "              path: /api/v1/books/",
    "              port: 8000",
    "            initialDelaySeconds: 30",
    "            periodSeconds: 10",
    "          readinessProbe:",
    "            httpGet:",
    "              path: /api/v1/books/",
    "              port: 8000",
    "            initialDelaySeconds: 10",
    "            periodSeconds: 5",
  ]),

  h2("10.6  Service"),
  code([
    "# k8s/service.yaml",
    "apiVersion: v1",
    "kind: Service",
    "metadata:",
    "  name: bookstore-service",
    "  namespace: bookstore",
    "spec:",
    "  selector:",
    "    app: bookstore-api          # must match Deployment labels",
    "  ports:",
    "    - protocol: TCP",
    "      port: 80",
    "      targetPort: 8000",
    "  type: ClusterIP               # internal only — Ingress exposes it",
  ]),

  h2("10.7  Ingress"),
  code([
    "# k8s/ingress.yaml",
    "apiVersion: networking.k8s.io/v1",
    "kind: Ingress",
    "metadata:",
    "  name: bookstore-ingress",
    "  namespace: bookstore",
    "  annotations:",
    "    nginx.ingress.kubernetes.io/rewrite-target: /",
    "spec:",
    "  ingressClassName: nginx",
    "  rules:",
    "    - host: bookstore.example.com",
    "      http:",
    "        paths:",
    "          - path: /",
    "            pathType: Prefix",
    "            backend:",
    "              service:",
    "                name: bookstore-service",
    "                port:",
    "                  number: 80",
  ]),

  h2("10.8  Deploy Commands"),
  code([
    "# 1. Build and tag the Docker image",
    "docker build -t bookstore-api:latest .",
    "",
    "# 2. If using a remote registry (e.g. Docker Hub)",
    "docker tag bookstore-api:latest yourdockerhub/bookstore-api:latest",
    "docker push yourdockerhub/bookstore-api:latest",
    "",
    "# 3. Apply all manifests",
    "kubectl apply -f k8s/",
    "",
    "# 4. Check everything is running",
    "kubectl get all -n bookstore",
    "",
    "# 5. Watch pod startup",
    "kubectl get pods -n bookstore -w",
    "",
    "# 6. See logs",
    "kubectl logs -n bookstore -l app=bookstore-api -f",
    "",
    "# 7. Run a management command in a pod",
    "kubectl exec -n bookstore deployment/bookstore-api -- \\",
    "  python manage.py createsuperuser",
    "",
    "# 8. Scale up",
    "kubectl scale deployment bookstore-api -n bookstore --replicas=5",
    "",
    "# 9. Rolling update (after pushing new image)",
    "kubectl set image deployment/bookstore-api \\",
    "  api=yourdockerhub/bookstore-api:v2 -n bookstore",
    "",
    "# 10. Roll back",
    "kubectl rollout undo deployment/bookstore-api -n bookstore",
  ]),

  divider(),

  // ═══════════════════════════════════════════════════════
  // CHAPTER 11 — QUICK REFERENCE
  // ═══════════════════════════════════════════════════════
  pageBreak(),
  h1("Chapter 11 — Quick Reference"),

  h2("ViewSet vs APIView vs @api_view"),
  new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [2400, 2400, 2400, 2160],
    rows: [
      new TableRow({
        tableHeader: true,
        children: ["Criterion", "ViewSet", "APIView", "@api_view"].map(
          (h) =>
            new TableCell({
              borders,
              width: { size: 2340, type: WidthType.DXA },
              shading: { fill: "1a1a2e", type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: h,
                      font: "Arial",
                      size: 20,
                      bold: true,
                      color: "ffffff",
                    }),
                  ],
                }),
              ],
            })
        ),
      }),
      ...[
        [
          "Code volume",
          "Minimal (2-3 lines)",
          "Medium (1 class/endpoint)",
          "Low (1 function)",
        ],
        [
          "URL generation",
          "Automatic (Router)",
          "Manual (urls.py)",
          "Manual (urls.py)",
        ],
        [
          "Best for",
          "Standard CRUD",
          "Custom per-method logic",
          "Single endpoints",
        ],
        [
          "Custom actions",
          "@action decorator",
          "Separate class",
          "Separate function",
        ],
        ["Reuse / Mixins", "Excellent", "Good", "Poor"],
        ["Readable to beginners", "Lower", "High", "High"],
      ].map(
        (row) =>
          new TableRow({
            children: row.map(
              (cell, i) =>
                new TableCell({
                  borders,
                  width: { size: i === 0 ? 2400 : 2320, type: WidthType.DXA },
                  shading: {
                    fill: i === 0 ? "e8eaf6" : "ffffff",
                    type: ShadingType.CLEAR,
                  },
                  margins: { top: 60, bottom: 60, left: 120, right: 120 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: cell,
                          font: "Arial",
                          size: 19,
                          color: "222222",
                        }),
                      ],
                    }),
                  ],
                })
            ),
          })
      ),
    ],
  }),

  ...empty(1),

  h2("HTTP Status Codes Used in REST"),
  infoTable([
    ["200 OK", "Successful GET, PUT, PATCH"],
    ["201 Created", "Successful POST — new resource created"],
    ["204 No Content", "Successful DELETE — no body returned"],
    ["400 Bad Request", "Validation errors — serializer.errors"],
    ["401 Unauthorized", "Missing or invalid JWT token"],
    ["403 Forbidden", "Valid token but insufficient permissions"],
    ["404 Not Found", "Resource does not exist"],
    ["405 Method Not Allowed", "HTTP verb not defined in the view"],
  ]),

  ...empty(1),
  h2("Common Mistakes"),
  bullet(
    "Forgetting partial=True on PATCH — causes all fields to be required."
  ),
  bullet(
    "Putting static URL paths AFTER dynamic <int:pk> paths — wrong view is matched."
  ),
  bullet(
    "Not calling makemigrations after model changes — database is out of sync."
  ),
  bullet(
    "Hardcoding SECRET_KEY in settings.py — use environment variables in production."
  ),
  bullet(
    "Using DEBUG=True in production — leaks error details and disables security features."
  ),
  bullet(
    "Not using select_related / prefetch_related — causes N+1 query problems."
  ),

  ...empty(2),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "0f3460", space: 1 },
    },
    children: [
      new TextRun({
        text: "End of Document",
        size: 20,
        font: "Arial",
        color: "888888",
        italics: true,
      }),
    ],
  }),
];

// ── BUILD DOCUMENT ────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
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
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1a1a2e" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "16213e" },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 },
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "0f3460" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("./django_rest_api_guide.docx", buf);
  console.log("Done");
});
