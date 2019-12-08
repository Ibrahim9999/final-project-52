CREATE TABLE patient
(
	SSN int(11) NOT NULL,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	birthdate DATE NOT NULL,
	PRIMARY KEY (SSN)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE medication
(
	ID int(11) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	p_safe tinyint(1) NOT NULL,
	PRIMARY KEY (ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE clinic
(
	ID int(11) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
	city varchar(255) NOT NULL,
	state varchar(255) NOT NULL,
	zip int(11) NOT NULL,
	PRIMARY KEY (ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE doctor
(
	ID int(11) NOT NULL AUTO_INCREMENT,
	first_name varchar(255) NOT NULL,
	last_name varchar(255) NOT NULL,
	C_ID int(11),
	PRIMARY KEY (ID),
	FOREIGN KEY (C_ID) REFERENCES clinic (ID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE prescription
(
	ID int(11) NOT NULL AUTO_INCREMENT,
  	issue_date DATE NOT NULL,
	PAT_SSN int(11) NOT NULL,
	MED_ID int(11) NOT NULL,
	DOC_ID int(11) NOT NULL,
	FOREIGN KEY (PAT_SSN) REFERENCES patient (SSN),
	FOREIGN KEY (MED_ID) REFERENCES medication(ID),
	FOREIGN KEY (DOC_ID) REFERENCES doctor(ID),
	PRIMARY KEY (ID)
) ENGINE = InnoDB DEFAULT CHARSET=latin1;


INSERT INTO patient(SSN, first_name, last_name, birthdate) VALUES

(102384662,'John','Johnson','1945-10-15'),
(639284611, 'Ellen', 'Norris', '1934-03-12'),
(934772337,'Victoria','Addams','1963-11-26'),
(733492091,'Caroline','Stevenson','2011-05-02'),
(378455109,'Benjamin','Norris','1987-03-08'),
(473829476, 'Blake', 'Harrison', '2014-10-17'),
(341285421, 'Harry', 'Whiteside', '1971-03-09'),
(255788922,'Emily','Langford','2016-12-25'),
(352846454,'Tom', 'Bleary', '1985-11-10'),
(462846589, 'John', 'Carver', '1967-02-08'),
(364519102, 'Noah', 'McKinley', '1987-01-22'),
(342265096, 'Peter', 'Jacobs','1993-04-07'),
(453261187, 'Haley', 'Mathison', '2001-10-31'),
(524376845, 'Mary', 'Hartford', '1942-06-29');

INSERT INTO medication(ID, name, p_safe) VALUES
(1, 'Claritin D', 1),
(2, 'Codeine', 0),
(3, 'Clonazepam', 0),
(4, 'Prozac', 1),
(5, 'Paxil', 0),
(6, 'Ativan', 0),
(7, 'Thalidomide',0),
(8, 'Isotretinoin', 0),
(9, 'Prilosec', 0),
(10, 'Penicilin',1);

INSERT INTO clinic(ID, name, address,city,state,zip) VALUES
(1,'Corvallis Family Medicine','2400 NW Kings Blvd','Corvallis','OR',97330),
(2,'Samaritan Ahtletic Medicine Center','840 SW 39th St','Corvallis','OR',97331),
(3,'Albany OB/GYN','705 SW Elm St Suite 200','Albany','OR',97321),
(4,'Philomath Family Medicine, PC','1219 Applegate St','Philomath','OR',97370),
(5,'Valley Clinics Internal Medicine, PC','981 NW Spruce Ave','Corvallis','OR',97330);

INSERT INTO doctor(ID, first_name, last_name,C_ID) VALUES
(1,'Carl','Masson',3),
(2,'Jeremy','Johnson',2),
(3,'Emily','Benson',2),
(4, 'Norman', 'Langley',1),
(5, 'Karen', 'Freeman', 3),
(6, 'John', 'Kenzie', 5),
(7, 'Meredith', 'Baxter', 4),
(8, 'Eva', 'Terrence', 4),
(9, 'Steve', 'Harrison', 2),
(10, 'Kevin', 'Jeremiah', 1);

INSERT INTO prescription(ID, PAT_SSN, MED_ID, DOC_ID, issue_date) VALUES
(1,102384662,3,1,'2019-11-03'),
(2,102384662,5,1,'2019-11-07'),
(3,102384662,5,2,'2019-11-23'),
(4,102384662,7,5,'2019-11-29'),
(5,639284611,1,6,'2019-11-10'),
(6,639284611,2,2,'2019-11-04'),
(7,639284611,8,4,'2019-11-07'),
(8,639284611,9,3,'2019-11-22'),
(9,639284611,9,3,'2019-11-26'),
(10,934772337,10,5,'2019-11-19'),
(11,934772337,4,8,'2019-11-08'),
(12,934772337,6,2,'2019-11-03'),
(13,934772337,6,2,'2019-11-01'),
(14,934772337,7,4,'2019-11-10'),
(15,733492091,4,6,'2019-11-30'),
(16,733492091,4,6,'2019-11-23'),
(17,733492091,3,4,'2019-11-06'),
(18,733492091,2,9,'2019-11-11'),
(19,378455109,9,8,'2019-11-09'),
(20,378455109,8,9,'2019-11-28'),
(21,378455109,2,3,'2019-10-31'),
(22,473829476,3,5,'2019-10-29'),
(23,473829476,3,3,'2019-10-28'),
(24,473829476,5,4,'2019-10-23'),
(25,473829476,7,7,'2019-11-23'),
(26,473829476,7,9,'2019-11-19'),
(27,473829476,2,9,'2019-10-18'),
(28,341285421,1,3,'2019-11-23'),
(29,341285421,5,1,'2019-11-03'),
(30,341285421,10,6,'2019-11-05'),
(31,341285421,8,2,'2019-11-27'),
(32,255788922,1,4,'2019-11-24'),
(33,255788922,1,5,'2019-11-14'),
(34,255788922,6,7,'2019-11-29'),
(35,352846454,9,9,'2019-11-08'),
(36,352846454,9,10,'2019-11-13'),
(37,352846454,2,3,'2019-11-17'),
(38,352846454,8,1,'2019-11-26'),
(39,352846454,7,2,'2019-11-18'),
(40,462846589,10,7,'2019-11-02'),
(41,462846589,6,5,'2019-11-04'),
(42,462846589,4,8,'2019-11-18'),
(43,364519102,1,7,'2019-11-11'),
(44,364519102,3,8,'2019-11-28'),
(45,364519102,5,10,'2019-11-04'),
(46,364519102,8,5,'2019-11-02'),
(47,364519102,9,6,'2019-11-10'),
(48,342265096,2,8,'2019-11-15'),
(49,342265096,2,2,'2019-11-18'),
(50,342265096,8,9,'2019-11-22'),
(51,342265096,10,9,'2019-11-29'),
(52,342265096,10,9,'2019-11-03'),
(53,342265096,6,10,'2019-11-07'),
(54,342265096,5,8,'2019-11-22'),
(55,453261187,3,7,'2019-11-29'),
(56,453261187,1,7,'2019-11-18'),
(57,453261187,7,2,'2019-11-07'),
(58,453261187,7,3,'2019-11-26'),
(59,524376845,2,4,'2019-11-11'),
(60,524376845,4,5,'2019-11-05'),
(61,524376845,4,10,'2019-11-01');