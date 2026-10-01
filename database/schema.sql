Changed database context to 'Expense_Management'.
-- =============================================
-- Expense Management Database Schema
-- =============================================
 
USE [Expense_Management];
GO
 
CREATE TABLE [dbo].[Mst_Expense_Category] (
    [EC_ID] int IDENTITY(1,1) NOT NULL,
    [Expense_Type] varchar(100) NULL,
    [Active_Status] bit NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
CREATE TABLE [dbo].[Mst_Expense_Type] (
    [ET_ID] int IDENTITY(1,1) NOT NULL,
    [EC_ID] int NULL,
    [Expense_Name] varchar(100) NULL,
    [Active_Status] bit NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
CREATE TABLE [dbo].[Mst_Income_Type] (
    [IT_ID] int IDENTITY(1,1) NOT NULL,
    [Income_Type] varchar(100) NULL,
    [Active_Status] bit NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
CREATE TABLE [dbo].[Mst_Role] (
    [RID] int IDENTITY(1,1) NOT NULL,
    [Role_Name] varchar(50) NULL,
    [Active_Status] bit NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
CREATE TABLE [dbo].[Mst_User] (
    [UID] int IDENTITY(1,1) NOT NULL,
    [RID] int NULL,
    [Emp_Code] varchar(20) NULL,
    [Emp_Name] varchar(100) NULL,
    [Mail_ID] varchar(100) NULL,
    [Mobile_No] varchar(15) NULL,
    [Password] varchar(100) NULL,
    [Active_Status] bit NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
CREATE TABLE [dbo].[Trn_Expense] (
    [EXP_ID] int IDENTITY(1,1) NOT NULL,
    [UID] int NOT NULL,
    [EC_ID] int NULL,
    [ET_ID] int NULL,
    [Expense_Date] date NOT NULL,
    [Amount] decimal(10,2) NOT NULL,
    [Remarks] varchar(255) NULL,
    [Active_Status] bit NULL DEFAULT ((1)),
    [Created_by] varchar(50) NULL,
    [Created_on] datetime NULL DEFAULT (getdate()),
    [Modified_by] varchar(50) NULL,
    [Modified_on] datetime NULL
);
GO
 
CREATE TABLE [dbo].[Trn_Income] (
    [INC_ID] int IDENTITY(1,1) NOT NULL,
    [IT_ID] int NULL,
    [Inc_Value] decimal(10,2) NULL,
    [Inc_Date] date NULL,
    [Remarks] varchar(255) NULL,
    [Created_On] datetime NULL,
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL,
    [UID] int NULL
);
GO
 
CREATE TABLE [dbo].[trn_loan] (
    [LO_ID] int IDENTITY(1,1) NOT NULL,
    [UID] int NOT NULL,
    [Loan_Type] varchar(50) NOT NULL,
    [Bank_Name] varchar(100) NOT NULL,
    [Loan_Amount] decimal(18,2) NULL,
    [Interest_Rate] decimal(5,2) NULL,
    [EMI_Start_Date] date NULL,
    [Tenure] int NULL,
    [Due_Date] date NULL,
    [Monthly_EMI] decimal(18,2) NULL,
    [Status] varchar(20) NULL,
    [Created_On] datetime NULL DEFAULT (getdate()),
    [Created_By] varchar(50) NULL,
    [Modified_On] datetime NULL,
    [Modified_By] varchar(50) NULL
);
GO
 
-- =============================================
-- PRIMARY KEYS
-- =============================================
 
ALTER TABLE [dbo].[Mst_Expense_Category] ADD CONSTRAINT [PK__Mst_Expe__46237E59F8F7347F] PRIMARY KEY ([EC_ID]);
ALTER TABLE [dbo].[Mst_Expense_Type] ADD CONSTRAINT [PK__Mst_Expe__3ECEBBA29D1A3497] PRIMARY KEY ([ET_ID]);
ALTER TABLE [dbo].[Mst_Income_Type] ADD CONSTRAINT [PK__Mst_Inco__6C6BDF4B24BCB591] PRIMARY KEY ([IT_ID]);
ALTER TABLE [dbo].[Mst_Role] ADD CONSTRAINT [PK__Mst_Role__CAFF413297C1A0A0] PRIMARY KEY ([RID]);
ALTER TABLE [dbo].[Mst_User] ADD CONSTRAINT [PK__Mst_User__C5B19602D2EB4529] PRIMARY KEY ([UID]);
ALTER TABLE [dbo].[Trn_Expense] ADD CONSTRAINT [PK__Trn_Expe__AFF213DBC5F3D6C3] PRIMARY KEY ([EXP_ID]);
ALTER TABLE [dbo].[Trn_Income] ADD CONSTRAINT [PK__Trn_Inco__EA2668468FE345FE] PRIMARY KEY ([INC_ID]);
ALTER TABLE [dbo].[trn_loan] ADD CONSTRAINT [PK__trn_loan__819E80A4C2261F60] PRIMARY KEY ([LO_ID]);
GO
 
-- =============================================
-- FOREIGN KEYS
-- =============================================
 
ALTER TABLE [dbo].[Mst_Expense_Type] ADD CONSTRAINT [FK__Mst_Expen__EC_ID__2F10007B] FOREIGN KEY ([EC_ID]) REFERENCES [dbo].[Mst_Expense_Category] ([EC_ID]);
ALTER TABLE [dbo].[Mst_User] ADD CONSTRAINT [FK__Mst_User__RID__3C69FB99] FOREIGN KEY ([RID]) REFERENCES [dbo].[Mst_Role] ([RID]);
ALTER TABLE [dbo].[Trn_Expense] ADD CONSTRAINT [FK_Expense_Category] FOREIGN KEY ([EC_ID]) REFERENCES [dbo].[Mst_Expense_Category] ([EC_ID]);
ALTER TABLE [dbo].[Trn_Expense] ADD CONSTRAINT [FK_Expense_Type] FOREIGN KEY ([ET_ID]) REFERENCES [dbo].[Mst_Expense_Type] ([ET_ID]);
ALTER TABLE [dbo].[Trn_Expense] ADD CONSTRAINT [FK_Expense_User] FOREIGN KEY ([UID]) REFERENCES [dbo].[Mst_User] ([UID]);
ALTER TABLE [dbo].[Trn_Income] ADD CONSTRAINT [FK__Trn_Incom__IT_ID__33D4B598] FOREIGN KEY ([IT_ID]) REFERENCES [dbo].[Mst_Income_Type] ([IT_ID]);
ALTER TABLE [dbo].[Trn_Income] ADD CONSTRAINT [FK_Income_User] FOREIGN KEY ([UID]) REFERENCES [dbo].[Mst_User] ([UID]);
ALTER TABLE [dbo].[Trn_Income] ADD CONSTRAINT [FK_TrnIncome_IncomeType] FOREIGN KEY ([IT_ID]) REFERENCES [dbo].[Mst_Income_Type] ([IT_ID]);
ALTER TABLE [dbo].[trn_loan] ADD CONSTRAINT [FK_LoanTransaction_User] FOREIGN KEY ([UID]) REFERENCES [dbo].[Mst_User] ([UID]);
GO
