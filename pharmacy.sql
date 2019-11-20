DROP TABLE IF EXISTS 'patient';
CREATE TABLE 'patient'
(
	'SSN' int(11) NOT NULL,
	'first_name' varchar(255) NOT NULL,
	'last_name' varchar(255) NOT NULL,
	'birthdate' DATE NOT NULL,
	PRIMARY KEY ('SSN')
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES 'patient' WRITE;
INSERT INTO 'patient'(SSN, first_name, last_name, birthdate) VALUES
(7334920091,'Caroline','Stevenson','2011-05-01'),
(102384662,'John','Johnson','1945-22-03'),
(934772337,'Victoria','Addams','1963-11-05'),
(378455109,'Benjamin','Norris','1987-17-08'),
(255788922,'Emily','Langford','2016-13-06');
UNLOCK TABLES;

DROP TABLE IF EXISTS 'medication';
CREATE TABLE 'medication'
(
	'ID' int(11) NOT NULL AUTO_INCREMENT,
	'name' varchar(255) NOT NULL,
	'p_safe' tinyint(1) NOT NULL,
	PRIMARY KEY ('ID')
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES 'medication' WRITE;
INSERT INTO 'medication'(ID, name, p_safe) VALUES
(1, 'Claritin D', 1),
(2, 'Codeine', 0),
(3, 'Clonazepam', 0),
(4, 'Prozac', 1),
(5, 'Paxil', 0);

UNLOCK TABLES;

DROP TABLE IF EXISTS 'doctor';
CREATE TABLE 'doctor'
(
	'ID' int(11) NOT NULL AUTO_INCREMENT,
	'first_name' varchar(255) NOT NULL,
	'last_name' varchar(255) NOT NULL,
	'C_ID' int(11),
	PRIMARY KEY ('ID')
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES 'doctor' WRITE;
INSERT INTO 'doctor'(ID, first_name, last_name,C_ID) VALUES
(1,'Carl','Masson',3),
(2,'Jeremy','Johsnon',2),
(3,'Emily Benson',2),
(4, 'Norman', 'Langley',1),
(5, 'Karen', 'Freeman', 3);
UNLOCK TABLES;

DROP TABLE IF EXISTS 'clinic';
CREATE TABLE 'clinic'
(
	'ID' int(11) NOT NULL AUTO_INCREMENT,
	'name' varchar(255) NOT NULL,
	'address' varchar(255) NOT NULL,
'city' varchar(255) NOT NULL,
'state' varchar(255) NOT NULL,
'zip' int(11) NOT NULL,
	PRIMARY KEY ('ID')
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES 'clinic' WRITE;
INSERT INTO 'clinic'(ID, name, address,city,state,zip) VALUES
(1,'Corvallis Family Medicine, 'PC','2400 NW Kings Blvd','Corvallis','OR',97330),
(2,'Samaritan Ahtletic Medicine Center','840 SW 39th St','Corvallis','OR',97331),
(3,'Albany OB/GYN','705 SW Elm St Suite 200','Albany','OR',97321),
(4,'Philomath Family Medicine, PC','1219 Applegate St','Philomath','OR',97370),
(5,'Valley Clinics Internal Medicine, PC','981 NW Spruce Ave','Corvallis','OR',97330);
UNLOCK TABLES;