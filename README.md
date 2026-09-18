# Dubai Premier Hotel Website

A Next.js-based hotel booking platform for guests to browse luxury cabins, make reservations, and manage their account.

---

## Project Description

This is a full-stack web application (Next.js App Router) that solves the problem of online cabin/room booking and reservation management for a luxury hotel. Guests can browse available cabins, select dates, create bookings, and manage their profile and existing reservations, while the backend logic is handled through Next.js Server Actions connected to Supabase [1](#0-0) .

## Application Structure

- `app/account/reservations/page.js` — lists all reservations for the logged-in guest [2](#0-1) 
- `app/account/reservations/edit/[bookingId]/page.js` — edit form for an existing booking (guests, observations) [3](#0-2) 
- `app/account/profile/page.js` — guest profile update page (nationality, national ID) [4](#0-3) 
- `app/_components/ReservationForm.js` — booking creation form bound to the `createBooking` server action [5](#0-4) 
- `app/_components/DateSelector.js` — calendar-based date range picker for cabin availability [6](#0-5) 
- `app/_components/ReservationList.js` — client component with optimistic booking deletion [7](#0-6) 
- `app/_components/ReservationCard.js` — displays a single reservation's details, edit/delete actions [8](#0-7) 
- `app/_components/DeleteReservation.js` — confirmation + transition-based deletion trigger [9](#0-8) 
- `app/cabins/thankyou/page.js` — booking confirmation page [10](#0-9) 
- `app/_lib/actions.js` — Server Actions layer (`updateGuest`, `deleteBooking`, `createBooking`, `updateBooking`) [11](#0-10) 
- `app/_lib/data-service.js` — Supabase data access layer (cabins, guests, bookings, settings, countries) [12](#0-11) 

## Key Features

- **Cabin Booking** — guests select date ranges and submit reservations via `ReservationForm`, which binds booking data to the `createBooking` server action [13](#0-12) 
- **Optimistic UI Updates** — reservation deletion updates the UI instantly using React's `useOptimistic` before server confirmation [14](#0-13) 
- **Reservation Management** — guests can view, edit (guests count, observations), and delete their bookings [15](#0-14) 
- **Guest Profile Updates** — guests can update nationality and national ID via a server action with validation [16](#0-15) 
- **Authorization Checks** — server actions verify booking ownership before allowing edits or deletions [17](#0-16) 
- **Date-based Availability** — `DateSelector` disables past and already-booked dates using `date-fns` and `react-day-picker` [18](#0-17) 
- **Cache Revalidation** — mutations trigger `revalidatePath` to keep cached pages fresh after data changes [19](#0-18) 

## Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | Next.js (App Router, Server & Client Components) |
| Backend/BaaS | Supabase [20](#0-19)  |
| Authentication | NextAuth (`auth`, `signIn`, `signOut`) [21](#0-20)  |
| State Management | React `useOptimistic`, `useState`, `useTransition` [22](#0-21)  |
| Styling | Tailwind CSS (utility classes throughout components) |
| Forms | Native forms bound to Next.js Server Actions, `useFormStatus` for pending state [23](#0-22)  |
| Date Handling | `date-fns`, `react-day-picker` [24](#0-23)  |
| Icons | Heroicons [25](#0-24)  |

## Architecture

The frontend renders mostly through Next.js Server Components that fetch data server-side via a data-access layer in `app/_lib/data-service.js`, which talks directly to Supabase [26](#0-25) . Mutations (create/update/delete bookings, update guest profile) go through Server Actions defined in `app/_lib/actions.js`, each performing authentication via `auth()`, authorization checks against the session's `guestId`, and cache invalidation via `revalidatePath` [27](#0-26) . Client components (`ReservationList`, `DeleteReservation`, `DateSelector`) layer React state hooks (`useOptimistic`, `useTransition`) on top of these server actions for responsive UX without traditional REST API routes.

## Documentation

Detailed wiki pages exist for this repository, including "Managing Reservations", "Guest Profile Management", "Booking Form & Submission", and "Glossary" of domain terms.

## Notes

- No traditional REST API layer is used — all data mutations flow through Next.js Server Actions (`"use server"`) directly calling Supabase [28](#0-27) .
- Booking status starts as `"unconfirmed"` on creation; `checked-in` status affects date availability calculations [29](#0-28) .
- `data-service.js` contains several commented-out duplicate functions (`createBooking`, `updateGuest`, `updateBooking`, `deleteBooking`) that appear superseded by the versions in `actions.js` [30](#0-29) .
- Due to index size limits, some file contents (e.g. full `app/_lib/auth.js`, `app/_lib/supabase.js`) were not available in this context; start a Devin session for full file access if deeper detail is needed.

Wiki pages you might want to explore:
- [Managing Reservations (LeonidYezerskyi/dubai-premier-hotel-website)](/wiki/LeonidYezerskyi/dubai-premier-hotel-website#4.3)
- [Guest Profile Management (LeonidYezerskyi/dubai-premier-hotel-website)](/wiki/LeonidYezerskyi/dubai-premier-hotel-website#5.2)
- [Glossary (LeonidYezerskyi/dubai-premier-hotel-website)](/wiki/LeonidYezerskyi/dubai-premier-hotel-website#8)
