-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "SchemeStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PlotStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD');

-- CreateEnum
CREATE TYPE "MediaKind" AS ENUM ('COVER', 'GATE', 'AERIAL', 'LAYOUT_PLAN', 'LOCATION_MAP', 'GALLERY', 'BROCHURE_PDF');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scheme" (
    "slug" TEXT NOT NULL,
    "nameGu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "taglineGu" TEXT,
    "taglineEn" TEXT,
    "status" "SchemeStatus" NOT NULL DEFAULT 'ONGOING',
    "developer" TEXT NOT NULL,
    "architect" TEXT,
    "addressGu" TEXT NOT NULL,
    "addressEn" TEXT NOT NULL,
    "surveyRef" TEXT NOT NULL,
    "mapsUrl" TEXT,
    "phones" TEXT[],
    "totalPlots" INTEGER NOT NULL,
    "accentColor" TEXT NOT NULL DEFAULT '#0F6E56',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scheme_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "key" TEXT NOT NULL,
    "labelGu" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "SchemeAmenity" (
    "schemeSlug" TEXT NOT NULL,
    "amenityKey" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SchemeAmenity_pkey" PRIMARY KEY ("schemeSlug","amenityKey")
);

-- CreateTable
CREATE TABLE "FloorPlan" (
    "id" TEXT NOT NULL,
    "schemeSlug" TEXT NOT NULL,
    "nameGu" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "builtUpArea" TEXT NOT NULL,
    "plotSize" TEXT,
    "bedrooms" INTEGER NOT NULL,
    "floors" INTEGER NOT NULL DEFAULT 1,
    "imageUrl" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FloorPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plot" (
    "id" TEXT NOT NULL,
    "schemeSlug" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "sqYard" DOUBLE PRECISION NOT NULL,
    "status" "PlotStatus" NOT NULL DEFAULT 'AVAILABLE',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "schemeSlug" TEXT NOT NULL,
    "kind" "MediaKind" NOT NULL,
    "url" TEXT NOT NULL,
    "thumbUrl" TEXT,
    "altGu" TEXT,
    "altEn" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "bytes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "FloorPlan_schemeSlug_idx" ON "FloorPlan"("schemeSlug");

-- CreateIndex
CREATE INDEX "Plot_schemeSlug_status_idx" ON "Plot"("schemeSlug", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Plot_schemeSlug_number_key" ON "Plot"("schemeSlug", "number");

-- CreateIndex
CREATE INDEX "Media_schemeSlug_kind_idx" ON "Media"("schemeSlug", "kind");

-- CreateIndex
CREATE INDEX "AuditLog_entity_entityId_idx" ON "AuditLog"("entity", "entityId");

-- AddForeignKey
ALTER TABLE "SchemeAmenity" ADD CONSTRAINT "SchemeAmenity_schemeSlug_fkey" FOREIGN KEY ("schemeSlug") REFERENCES "Scheme"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SchemeAmenity" ADD CONSTRAINT "SchemeAmenity_amenityKey_fkey" FOREIGN KEY ("amenityKey") REFERENCES "Amenity"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FloorPlan" ADD CONSTRAINT "FloorPlan_schemeSlug_fkey" FOREIGN KEY ("schemeSlug") REFERENCES "Scheme"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_schemeSlug_fkey" FOREIGN KEY ("schemeSlug") REFERENCES "Scheme"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_schemeSlug_fkey" FOREIGN KEY ("schemeSlug") REFERENCES "Scheme"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
