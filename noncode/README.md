# Quartz QR Code Reward System

## Project Overview

This project is a **QR code–based reward system** designed for **automotive workshops** using **Quartz products**.  
In a later phase, the same system will be extended to **Elf products**, through a **separate and independent website**.

For the moment, **this documentation focuses exclusively on the Quartz website**.

The objective of the platform is to provide a **secure, fair, and transparent reward mechanism** while **preventing fraud, duplication, or misuse of QR codes**.

---

## Core Concept

Each Quartz product is associated with a **unique, single-use QR code**.

When a product is used in a workshop:
- A mechanic scans the QR code
- Points are awarded to the workshop
- Points accumulate at the workshop level
- Accumulated points unlock promotions and rewards

At no point can QR codes be created, modified, or regenerated from the website.

---

## General Workflow

1. QR codes are generated **in advance** by an administrator  
2. QR codes are **physically attached** to products  
3. A mechanic scans the QR code when the product is used  
4. The scan awards points to the workshop  
5. Points accumulate at the workshop level  
6. When enough points are reached, promotions are unlocked  

This workflow ensures that **only real product usage generates rewards**.

---

## QR Code Generation (Administrator Side)

### Principle

QR codes are generated **outside of the website**, using a **dedicated internal tool**.

Currently, this tool is implemented as:
- A **Python script**
- Later evolving into a **standalone internal application**

This separation guarantees **full administrative control** over QR code creation and distribution.

---

### Input File Format

QR codes are generated from a simple text file where **each line represents one product**.

Example:

216914 QUARTZ-INEO 10

Each line contains:
- A **product reference number**
- A **product name**
- A **number of points** associated with the product

---

### QR Code Generation Process

The generation tool performs the following steps:

1. Reads the input file line by line  
2. Generates a **unique identifier** for each product  
3. Assigns the corresponding number of points  
4. Creates a **single-use QR code**  
5. Stores the QR code securely in the system  
6. Generates a **QR image** that can be printed and attached to the product  

Each QR code:
- Is **unique**
- Can only be used **once**
- Cannot be regenerated or reused

The long-term goal is to expose **QR-related data through a dedicated administrative webpage**.

---

## QR Code Scanning (Workshop Side)

### Scan Logic

When a mechanic scans a QR code, the system performs the following checks:

1. Verifies that the QR code exists  
2. Verifies that the QR code has **never been used before**  

If the QR code is valid:
- The QR code is **immediately locked**
- Points are added to the workshop
- The scan is permanently recorded  

If the QR code has already been scanned:
- The scan is rejected
- No points are added  

This guarantees **strict single-use behavior**, even in case of repeated scan attempts.

---

## Points Logic

- Each QR code grants a **specific number of points**
- Different products may grant **different point values**
- Points are scanned by mechanics but **belong to the workshop**
- Points are **never transferable** between workshops

---

## Visibility and Access Rules

### Mechanic

A mechanic can view:
- Their **own scan history**
- The **points they personally generated**

A mechanic cannot view:
- Other mechanics’ scans
- Total workshop points
- Promotion management data

---

### Workshop Owner

A workshop owner can view:
- Total workshop points
- Total number of scans
- A detailed breakdown of points earned by each mechanic

This allows the owner to:
- Monitor workshop activity
- Evaluate employee contributions
- Decide how to spend workshop points

---

## Promotions Logic

- Promotions are **visible to everyone**, even without authentication
- Each promotion requires a **minimum number of points**
- Promotions unlock based on **total workshop points**
- Only the **workshop owner** can decide when to redeem points
- Promotions are fully managed by administrators

Promotions are designed to **reward collective performance**, not individual competition.

---

## Roles and Responsibilities

### Administrator

- Generates QR codes offline
- Controls the reward system
- Manages promotions
- Accesses global statistics
- Maintains system integrity

---

### Workshop Owner

- Manages a single workshop
- Monitors workshop performance
- Views total points and scan history
- Analyzes mechanic contributions
- Uses workshop points to unlock promotions

---

### Mechanic

- Scans QR codes during product usage
- Earns points for the workshop
- Views only personal performance data

---

## Key Principles of the System

- QR codes are generated **only once**, outside the website  
- QR codes are **single-use only**  
- Points are **fully traceable and auditable**  
- Workshops are **fully isolated** from one another  
- Promotions reward **collective workshop performance**  
- The platform remains **simple, secure, and usage-focused**

---

## Summary

This system establishes a **controlled and transparent reward mechanism** where:

- Products generate value through QR codes  
- Workshops are rewarded for real and measurable activity  
- Employees contribute without unfair competition  
- Administrators retain full control over QR generation  
- The website remains focused on usage, security, and reliability  

The Quartz QR Code Reward System provides a strong foundation for a future multi-brand reward ecosystem while maintaining fairness, security, and operational simplicity.