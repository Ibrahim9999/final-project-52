#Patient Table
#view patient table
SELECT * FROM patient;

#new patient
INSERT INTO patient(SSN, first_name, last_name, birthdate)
VALUE(:SSN, :first_name,:last_name, :birthdate);

#delete patient
DELETE FROM patient WHERE SSN = :SSN;

#edit patient
UPDATE patient
SET first_name = :first_name, last_name = :last_name, birthdate=birthdate
WHERE SSN = :SSN;

#Medication Table
#view medication table
SELECT * FROM medication;

#new medication
INSERT INTO medication(ID, name, p_safe)
VALUE(:ID, name, p_safe);

#delete medication
DELETE FROM medication WHERE id = :id;

#edit medication
UPDATE medication
SET name = :name, p_safe
WHERE ID = :ID;


#Doctor Table
#view doctor table
SELECT * FROM doctor;

#new doctor
INSERT INTO doctor(ID, first_name, last_name, C_ID)
VALUE(:ID, :first_name,:last_name, :C_ID);

#delete doctor
DELETE FROM doctor WHERE id = :id;

#edit doctor
UPDATE doctor
SET first_name = :first_name, last_name = :last_name, C_ID = :C_ID
WHERE ID = :ID;

#Clinic Table
#view clinic table
SELECT * FROM clinic;

#new clinic
INSERT INTO clinic(ID, address, city, state, zip)
VALUE(:ID, :address, :city, :state, :zip);

#delete clinic
DELETE FROM clinic WHERE id = :id
#Update doctor's foreign C_ID after deletion
UPDATE doctor
SET C_ID = NULL
WHERE C_ID = :ID;

#edit clinic
UPDATE clinic
SET address = :address, city = :city, state = :state, zip = :zip
WHERE ID = :ID;

#create many-to-many Patients_Medications table
