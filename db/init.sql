-- Create a new schema
CREATE SCHEMA IF NOT EXISTS nawy_apartment;

-- Table: nawy_apartment.apartment

-- Create table
CREATE TABLE IF NOT EXISTS nawy_apartment.apartment
(
    id SERIAL PRIMARY KEY,
    unit_number character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    size integer NOT NULL,
    price integer NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    bedrooms_count integer NOT NULL,
    bathrooms_count integer NOT NULL,
    amenities text[] COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    country character varying COLLATE pg_catalog."default" NOT NULL,
    latitude character varying COLLATE pg_catalog."default",
    longitude character varying COLLATE pg_catalog."default",
    project character varying COLLATE pg_catalog."default" NOT NULL,
    normalized_unit_number character varying COLLATE pg_catalog."default" NOT NULL,
    normalized_project character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "UQ_d393124bedb649d8c07bec8c008" UNIQUE (normalized_unit_number, normalized_project)
);

-- Seed Demo Data
INSERT INTO nawy_apartment.apartment(
  unit_number, name, title, size, price, description, bedrooms_count, bathrooms_count, amenities, address, city, country, latitude, longitude, project, normalized_unit_number, normalized_project
)
VALUES 
  ('A-101', 'Luxury Apartment', '3BR Garden view', 180, 578500, 'Modern apartment in city center', 3, 2, '{Gym,Garden,Parking}', 'City Center', 'Cairo', 'Egypt', '30.017028745500614', '31.41301274299622', 'City Center Heights', 'a-101', 'citycenterheights'),
  ('A-426', 'New Furnished Apartment', '5BR Nile view', 250, 995500, 'luxury big apartment in city center', 5, 3, '{Gym,Parking,Nile}', 'City Center', 'Cairo', 'Egypt', '30.017028745500614', '31.41301274299622', 'city center heights', 'a-426', 'citycenterheights'),
  ('I-5520', 'Fantastic Apartment', '2BR new apartment', 120, 460500, 'Fantastic apartment in new cairo residence', 2, 1, '{Security,Mall,Clinic,Wifi}', 'New Cairo', 'Cairo', 'Egypt', '30.017028745500614', '31.41301274299622', 'New Cairo Residence', 'i-5520', 'newcairoresidence'),
  ('M - 057', 'Duplex', '4BR duplex', 300, 1100000, 'Duplec apartment in NorthCoast', 5, 3, '{Gym,Sea,Pool,Parking}', 'North Coast', 'Marsa Matrouh', 'Egypt', '30.017028745500614', '31.41301274299622', 'Marasi', 'm-057', 'marasi'),
  ('K- 6310', 'Luxury Villa', 'Infinity Pool villa', 900, 2450000, 'luxury huge villa in new cairo', 10, 6, '{Parking,Security}', 'New Cairo', 'Cairo', 'Egypt', '30.017028745500614', '31.41301274299622', 'New Cairo Residence', 'k-6310', 'newcairoresidence'),
  ('Yy - 2052', 'New Furnished Studio', 'Modern Studio', 50, 500000, 'Studio rooftop in city center', 1, 1, '{Parking,Nile}', 'City Center', 'Cairo', 'Egypt', '30.017028745500614', '31.41301274299622', 'City Center Plaza', 'yy-2052', 'citycenterplaza'),
  ('B-10 - S-2', 'Luxury Studio', 'Luxury furnished studio', 65, 650000, 'Luxury studio in alexandria', 1, 1, '{Sea,Pets}', 'Montaza', 'Alexandria', 'Egypt', '30.017028745500614', '31.41301274299622', 'Monatza Hotel', 'b-10-s-2', 'monatzahotel'),
  ('V-17', 'New Furnished Villa', '3 floors villa', 760, 1750000, 'Villa ready for residence in new giza', 7, 4, '{Gym,Parking}', 'New Giza', 'Giza', 'Egypt', '30.017028745500614', '31.41301274299622', 'NewGiza Compound', 'v-17', 'newgizacompound');


-- Table: nawy_apartment.image

-- Create table
CREATE TABLE IF NOT EXISTS nawy_apartment.image
(
    id SERIAL PRIMARY KEY,
    url character varying COLLATE pg_catalog."default" NOT NULL,
    file_name character varying COLLATE pg_catalog."default" NOT NULL,
    "apartmentId" integer,
    CONSTRAINT "FK_3059ce202483d51993c5995a3f6" FOREIGN KEY ("apartmentId")
        REFERENCES nawy_apartment.apartment (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

-- Seed Demo Data
INSERT INTO nawy_apartment.image(
  url, file_name, "apartmentId"
)
VALUES 
  ('/uploads/1753372928321-101911100.jpg', '1753372928321-101911100.jpg', 1),
  ('/uploads/1753372982263-50067626.jpg', '1753372982263-50067626.jpg', 2),
  ('/uploads/1753373007095-102110468.jpg', '1753373007095-102110468.jpg', 3),
  ('/uploads/1753373007096-624374454.jpg', '1753373007096-624374454.jpg', 3),
  ('/uploads/1753373007097-965786868.jpg', '1753373007097-965786868.jpg', 3),
  ('/uploads/1753373024043-653988935.jpg', '1753373024043-653988935.jpg', 4),
  ('/uploads/1753373024044-790849519.jpg', '1753373024044-790849519.jpg', 4),
  ('/uploads/1753373041032-342744616.jpg', '1753373041032-342744616.jpg', 5),
  ('/uploads/1753373049382-735251204.jpg', '1753373049382-735251204.jpg', 6),
  ('/uploads/1753373049383-309285837.jpg', '1753373049383-309285837.jpg', 6),
  ('/uploads/1753388080401-806763992.jpg', '1753388080401-806763992.jpg', 7),
  ('/uploads/1753388108599-489513267.jpg', '1753388108599-489513267.jpg', 8);
