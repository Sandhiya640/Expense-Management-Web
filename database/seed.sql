Changed database context to 'Expense_Management'.
-- =============================================
-- Expense Management Database Seed Data
-- Dummy / Sample Data Only
-- =============================================
 
USE [Expense_Management];
GO
 
-- Mst_Role
SET IDENTITY_INSERT [dbo].[Mst_Role] ON;
GO
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1, 'Admin', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2, 'User', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (3, 'Manager', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4, 'HR', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (5, 'Accountant', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (6, 'Supervisor', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (7, 'Team Lead', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (8, 'Employee', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (9, 'Auditor', 1, '2026-06-02 10:10:24.870', 'System', NULL, NULL);
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 'Guest', 1, '2026-06-02 10:10:24.870', 'System', '2026-06-16 06:51:37.250', 'System');
INSERT INTO [dbo].[Mst_Role] ([RID], [Role_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2012, 'deputy manager', 1, '2026-09-05 15:08:47.780', 'System', NULL, NULL);
GO
SET IDENTITY_INSERT [dbo].[Mst_Role] OFF;
GO
 
-- Mst_Expense_Category
SET IDENTITY_INSERT [dbo].[Mst_Expense_Category] ON;
GO
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1, 'Food', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2, 'Travel', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (3, 'Shopping', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4, 'Medical', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (5, 'Education', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (6, 'Entertainment', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (7, 'Electricity Bill', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (8, 'Internet Bill', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (9, 'Fuel', 1, '2026-06-02 10:24:30.310', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Category] ([EC_ID], [Expense_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 'Rent', 1, '2026-06-02 10:24:30.310', 'Admin', '2026-06-18 05:13:13.877', 'Admin');
GO
SET IDENTITY_INSERT [dbo].[Mst_Expense_Category] OFF;
GO
 
-- Mst_Income_Type
SET IDENTITY_INSERT [dbo].[Mst_Income_Type] ON;
GO
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2, 'Freelancing', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (3, 'Business', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4, 'Rental Income', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (5, 'Bonus', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (6, 'Commission', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (7, 'Interest Income', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (8, 'Investment Return', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (9, 'Part Time Job', 1, '2026-06-02 10:29:19.447', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Income_Type] ([IT_ID], [Income_Type], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 'Gift Income', 1, '2026-06-02 10:29:19.447', 'Admin', '2026-06-16 06:52:33.567', 'Admin');
GO
SET IDENTITY_INSERT [dbo].[Mst_Income_Type] OFF;
GO
 
-- Mst_User

SET IDENTITY_INSERT [dbo].[Mst_User] ON;

GO

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 1, 'DEMO001', 'Arun Kumar', 'arun.demo@example.com', '9000000010', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', '2026-06-04 10:49:00.203', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (11, 2, 'DEMO002', 'Priya Sharma', 'priya.demo@example.com', '9000000011', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', '2026-06-03 06:57:26.280', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (12, 3, 'DEMO003', 'Rahul Mehta', 'rahul.demo@example.com', '9000000012', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (13, 4, 'DEMO004', 'Neha Patel', 'neha.demo@example.com', '9000000013', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (14, 5, 'DEMO005', 'Vikram Singh', 'vikram.demo@example.com', '9000000014', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (15, 6, 'DEMO006', 'Ananya Rao', 'ananya.demo@example.com', '9000000015', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (16, 7, 'DEMO007', 'Karan Shah', 'karan.demo@example.com', '9000000016', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (17, 8, 'DEMO008', 'Meera Nair', 'meera.demo@example.com', '9000000017', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', '2026-06-03 04:14:44.353', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (18, 9, 'DEMO009', 'Rohan Das', 'rohan.demo@example.com', '9000000018', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (19, 2, 'DEMO010', 'Divya Iyer', 'divya.demo@example.com', '9000000019', 'Demo@123', 1, '2026-06-02 11:53:39.290', 'Admin', '2026-06-03 04:23:31.593', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1002, 8, 'DEMO011', 'Aditya Menon', 'aditya.demo@example.com', '9000000020', 'Demo@123', 1, '2026-06-03 03:53:26.277', 'Admin', '2026-06-03 12:03:06.943', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1009, 2, 'DEMO012', 'Ishita Verma', 'ishita.demo@example.com', '9000000021', 'Demo@123', 1, '2026-06-05 06:10:54.550', 'Admin', '2026-06-16 06:47:15.137', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2009, 5, 'DEMO013', 'Arjun Kapoor', 'arjun.demo@example.com', '9000000022', 'Demo@123', 1, '2026-06-11 06:42:38.100', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2010, 4, 'DEMO014', 'Sneha Joshi', 'sneha.demo@example.com', '9000000023', 'Demo@123', 1, '2026-06-16 03:58:39.790', 'Admin', NULL, NULL);

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2011, 8, 'DEMO015', 'Nikhil Gupta', 'nikhil.demo@example.com', '9000000024', 'Demo@123', 1, '2026-06-16 03:59:34.650', 'Admin', '2026-06-16 06:51:10.320', 'Admin');

INSERT INTO [dbo].[Mst_User] ([UID], [RID], [Emp_Code], [Emp_Name], [Mail_ID], [Mobile_No], [Password], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4010, 4, 'DEMO016', 'Pooja Nair', 'pooja.demo@example.com', '9000000025', 'Demo@123', 1, '2026-09-05 11:27:45.197', 'Admin', NULL, NULL);

GO

SET IDENTITY_INSERT [dbo].[Mst_User] OFF;

GO

-- Mst_Expense_Type
SET IDENTITY_INSERT [dbo].[Mst_Expense_Type] ON;
GO
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1, 1, 'Breakfast', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2, 1, 'Lunch', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (3, 2, 'Bus Ticket', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4, 2, 'Train Ticket', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (5, 3, 'Dress Purchase', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (6, 4, 'Hospital Fees', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (7, 5, 'Course Fees', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (8, 6, 'Movie Ticket', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (9, 7, 'EB Payment', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 10, 'House Rent', 1, '2026-06-02 10:26:00.923', 'Admin', NULL, NULL);
INSERT INTO [dbo].[Mst_Expense_Type] ([ET_ID], [EC_ID], [Expense_Name], [Active_Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (13, 9, 'Petrol', 1, '2026-06-16 04:04:27.423', 'System', '2026-06-16 06:52:50.670', 'System');
GO
SET IDENTITY_INSERT [dbo].[Mst_Expense_Type] OFF;
GO
 
-- Trn_Expense
SET IDENTITY_INSERT [dbo].[Trn_Expense] ON;
GO
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1, 10, 1, 1, '2026-06-01', 120.00, 'Breakfast at office', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (2, 11, 2, 3, '2026-06-02', 4500.00, 'Bus ticket', 1, 'Admin', '2026-06-10 07:03:09.363', 'Admin', '2026-06-16 07:24:55.600');
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (3, 11, 1, 2, '2026-06-03', 25000.00, 'Lunch with team', 1, 'Admin', '2026-06-10 07:03:09.363', 'Admin', '2026-06-16 07:25:04.870');
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (4, 12, 5, 7, '2026-06-04', 1500.00, 'Online course fee', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (5, 13, 3, 5, '2026-06-05', 2200.00, 'Dress purchase', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (6, 14, 4, 6, '2026-06-06', 5000.00, 'Hospital consultation', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (7, 13, 6, 8, '2026-06-07', 350.00, 'Movie ticket', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (8, 15, 7, 9, '2026-06-08', 1800.00, 'Electricity bill', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (10, 19, 2, 4, '2026-06-10', 900.00, 'Train ticket booking', 1, 'Admin', '2026-06-10 07:03:09.363', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1002, 10, 1, 2, '2026-06-01', 112.00, 'breakfast', 1, 'Admin', '2026-06-11 06:44:45.343', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1003, 1002, 1, 1, '2026-06-16', 180.00, 'Client breakfast', 1, 'Admin', '2026-06-11 06:57:38.510', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1004, 1009, 2, 4, '2026-06-17', 1450.00, 'Business trip', 1, 'Admin', '2026-06-11 06:57:38.533', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1005, 2009, 3, 5, '2026-06-18', 3200.00, 'Office event dress', 1, 'Admin', '2026-06-11 06:57:38.553', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1006, 14, 4, 6, '2026-06-19', 2500.00, 'Health checkup', 1, 'Admin', '2026-06-11 06:57:38.570', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1007, 15, 7, 9, '2026-06-20', 2100.00, 'June EB bill', 1, 'Admin', '2026-06-11 06:57:38.590', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1009, 17, 1, 2, '2026-06-22', 420.00, 'Project lunch', 1, 'Admin', '2026-06-11 06:57:38.617', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1010, 18, 8, 10, '2026-06-23', 1800.00, 'Monthly payment', 1, 'Admin', '2026-06-11 06:57:38.630', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1011, 19, 2, 3, '2026-06-24', 300.00, 'Local travel', 1, 'Admin', '2026-06-11 06:57:38.643', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (1012, 12, 5, 7, '2026-06-25', 4500.00, 'Certification course', 1, 'Admin', '2026-06-11 06:57:38.660', NULL, NULL);
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (2002, 17, 7, 9, '2026-06-25', 1200.00, 'EB BILL', 1, 'Admin', '2026-06-16 04:52:40.657', 'Admin', '2026-06-16 07:17:16.787');
INSERT INTO [dbo].[Trn_Expense] ([EXP_ID], [UID], [EC_ID], [ET_ID], [Expense_Date], [Amount], [Remarks], [Active_Status], [Created_by], [Created_on], [Modified_by], [Modified_on]) VALUES (2006, 16, 5, 7, '2026-07-24', 13000.00, 'school', 1, 'Admin', '2026-06-16 07:21:10.130', NULL, NULL);
GO
SET IDENTITY_INSERT [dbo].[Trn_Expense] OFF;
GO
 
-- Trn_Income
SET IDENTITY_INSERT [dbo].[Trn_Income] ON;
GO
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1003, 2, 120000.00, '2026-02-12', 'Freelancing Project', '2026-06-09 04:41:25.147', 'Admin', '2026-06-17 04:13:19.860', 'Admin', 11);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1004, 3, 30000.00, '2026-03-18', 'Business Profit', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 12);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1005, 4, 15000.00, '2026-04-09', 'Rental Income', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 13);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1006, 5, 5000.00, '2026-05-21', 'Festival Bonus', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 14);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1007, 6, 8000.00, '2026-06-14', 'Sales Commission', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 15);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1008, 7, 2500.00, '2026-07-03', 'Bank Interest', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 16);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1009, 8, 10000.00, '2026-08-26', 'Investment Return', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 17);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1010, 9, 7000.00, '2026-09-11', 'Part Time Work', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 18);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1011, 10, 3000.00, '2026-10-30', 'Gift Amount', '2026-06-09 04:41:25.147', 'Admin', NULL, NULL, 19);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (1012, 4, 79870.00, '2026-06-12', 'House Rent', '2026-06-09 09:55:29.613', 'Admin', NULL, NULL, 10);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3033, 5, 18000.00, '2026-11-15', 'Year End Bonus', '2026-06-11 04:47:25.120', 'Admin', NULL, NULL, 11);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3034, 7, 22000.00, '2026-11-16', 'FD Interest', '2026-06-11 04:47:25.140', 'Admin', NULL, NULL, 12);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3035, 2, 17000.00, '2026-11-17', 'Side Project', '2026-06-11 04:47:25.163', 'Admin', NULL, NULL, 13);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3036, 4, 9000.00, '2026-11-18', 'House Rent', '2026-06-11 04:47:25.180', 'Admin', NULL, NULL, 14);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3037, 3, 26000.00, '2026-11-19', 'Small Business', '2026-06-11 04:47:25.190', 'Admin', NULL, NULL, 15);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3038, 6, 11000.00, '2026-11-20', 'Sales Incentive', '2026-06-11 04:47:25.207', 'Admin', NULL, NULL, 16);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3039, 9, 8000.00, '2026-11-21', 'Weekend Work', '2026-06-11 04:47:25.217', 'Admin', NULL, NULL, 17);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3040, 10, 5000.00, '2026-11-22', 'Gift Received', '2026-06-11 04:47:25.230', 'Admin', NULL, NULL, 18);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3041, 8, 14000.00, '2026-11-23', 'Stock Profit', '2026-06-11 04:47:25.240', 'Admin', NULL, NULL, 19);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3042, 5, 12000.00, '2026-11-24', 'Performance Bonus', '2026-06-11 04:47:25.253', 'Admin', NULL, NULL, 1002);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3043, 2, 20000.00, '2026-11-15', 'Year End Bonus', '2026-06-11 05:00:59.123', 'Admin', NULL, NULL, 11);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3044, 4, 17000.00, '2026-11-17', 'Side Project', '2026-06-11 05:00:59.160', 'Admin', NULL, NULL, 13);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3046, 4, 454500.00, '2026-02-19', 'rent', '2026-06-15 10:28:50.810', 'Admin', '2026-06-17 04:13:39.427', 'Admin', 11);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (3047, 2, 12300.00, '2026-03-06', 'freenlance', '2026-06-16 04:02:54.677', 'Admin', NULL, NULL, 11);
INSERT INTO [dbo].[Trn_Income] ([INC_ID], [IT_ID], [Inc_Value], [Inc_Date], [Remarks], [Created_On], [Created_By], [Modified_On], [Modified_By], [UID]) VALUES (4047, 5, 11000.00, '2026-11-20', 'Sales Incentive', '2026-06-19 04:12:25.273', 'Admin', NULL, NULL, 16);
GO
SET IDENTITY_INSERT [dbo].[Trn_Income] OFF;
GO
 
-- trn_loan
SET IDENTITY_INSERT [dbo].[trn_loan] ON;
GO
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (1, 10, 'Personal', 'SBI', 50000.00, 12.00, '2026-06-01', 12, '2027-06-01', 4442.44, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (2, 11, 'Education', 'ICICI', 300000.00, 10.50, '2026-06-11', 24, '2028-06-11', 13865.90, 'Active', '2026-06-10 04:00:58.177', 'Admin', '2026-06-17 04:33:58.330', 'Admin');
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (3, 12, 'Vehicle', 'HDFC', 450000.00, 9.25, '2026-07-01', 36, '2029-07-01', 14330.25, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (4, 13, 'Home', 'Axis Bank', 1500000.00, 8.75, '2026-07-15', 120, '2036-07-15', 18784.50, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (5, 14, 'Personal', 'Canara Bank', 75000.00, 11.50, '2026-08-01', 18, '2028-02-01', 4567.80, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (6, 15, 'Medical', 'Indian Bank', 100000.00, 10.00, '2026-08-10', 24, '2028-08-10', 4614.90, 'Closed', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (7, 16, 'Gold', 'Federal Bank', 200000.00, 8.50, '2026-09-01', 12, '2027-09-01', 17412.30, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (8, 17, 'Education', 'SBI', 400000.00, 9.75, '2026-09-15', 36, '2029-09-15', 12887.60, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (9, 18, 'Business', 'ICICI', 600000.00, 12.25, '2026-10-01', 48, '2030-10-01', 15890.45, 'Pending', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (10, 19, 'Personal', 'HDFC', 120000.00, 10.75, '2026-10-20', 24, '2028-10-20', 5558.75, 'Active', '2026-06-10 04:00:58.177', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (21, 12, 'Home', 'SBI', 700000.00, 5.00, '2026-06-12', 30, '2028-12-12', 24870.56, 'Active', '2026-06-10 05:46:46.553', 'Admin', NULL, NULL);
INSERT INTO [dbo].[trn_loan] ([LO_ID], [UID], [Loan_Type], [Bank_Name], [Loan_Amount], [Interest_Rate], [EMI_Start_Date], [Tenure], [Due_Date], [Monthly_EMI], [Status], [Created_On], [Created_By], [Modified_On], [Modified_By]) VALUES (22, 11, 'Education', 'HDFC', 500000.00, 10.85, '2006-10-01', 24, '2008-10-01', 23269.11, 'Closed', '2026-06-10 11:49:47.700', 'Admin', '2026-06-17 04:31:07.600', 'Admin');
GO
SET IDENTITY_INSERT [dbo].[trn_loan] OFF;
GO
 
