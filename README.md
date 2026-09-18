# Dubai Premier Hotel Website

A Next.js-based hotel booking platform for guests to browse luxury cabins, make reservations, and manage their account.

---

## Project Description

This is a full-stack web application (Next.js App Router) that solves the problem of online cabin/room booking and reservation management for a luxury hotel. Guests can browse available cabins, select dates, create bookings, and manage their profile and existing reservations, while the backend logic is handled through Next.js Server Actions connected to Supabase.

## Application Structure

- `app/account/reservations/page.js` — lists all reservations for the logged-in guest
- `app/account/reservations/edit/[bookingId]/page.js` — edit form for an existing booking (guests, observations)
- `app/account/profile/page.js` — guest profile update page (nationality, national ID)
- `app/_components/ReservationForm.js` — booking creation form bound to the `createBooking` server action
- `app/_components/DateSelector.js` — calendar-based date range picker for cabin availability
- `app/_components/ReservationList.js` — client component with optimistic booking deletion
- `app/_components/ReservationCard.js` — displays a single reservation's details, edit/delete actions
- `app/_components/DeleteReservation.js` — confirmation + transition-based deletion trigger
- `app/cabins/thankyou/page.js` — booking confirmation page
- `app/_lib/actions.js` — Server Actions layer (`updateGuest`, `deleteBooking`, `createBooking`, `updateBooking`)
- `app/_lib/data-service.js` — Supabase data access layer (cabins, guests, bookings, settings, countries)

## Key Features

- **Cabin Booking** — guests select date ranges and submit reservations via `ReservationForm`, which binds booking data to the `createBooking` server action
- **Optimistic UI Updates** — reservation deletion updates the UI instantly using React's `useOptimistic` before server confirmation
- **Reservation Management** — guests can view, edit (guests count, observations), and delete their bookings
- **Guest Profile Updates** — guests can update nationality and national ID via a server action with validation
- **Authorization Checks** — server actions verify booking ownership before allowing edits or deletions
- **Date-based Availability** — `DateSelector` disables past and already-booked dates using `date-fns` and `react-day-picker`
- **Cache Revalidation** — mutations trigger `revalidatePath` to keep cached pages fresh after data changes

## Tech Stack

| Category | Technology |
|---|---|
| Frontend Framework | Next.js (App Router, Server & Client Components) |
| Backend/BaaS | Supabase |
| Authentication | NextAuth (`auth`, `signIn`, `signOut`) |
| State Management | React `useOptimistic`, `useState`, `useTransition` |
| Styling | Tailwind CSS (utility classes throughout components) |
| Forms | Native forms bound to Next.js Server Actions, `useFormStatus` for pending state |
| Date Handling | `date-fns`, `react-day-picker` |
| Icons | Heroicons |

## Architecture

The frontend renders mostly through Next.js Server Components that fetch data server-side via a data-access layer in `app/_lib/data-service.js`, which talks directly to Supabase. Mutations (create/update/delete bookings, update guest profile) go through Server Actions defined in `app/_lib/actions.js`, each performing authentication via `auth()`, authorization checks against the session's `guestId`, and cache invalidation via `revalidatePath`. Client components (`ReservationList`, `DeleteReservation`, `DateSelector`) layer React state hooks (`useOptimistic`, `useTransition`) on top of these server actions for responsive UX without traditional REST API routes.

## Documentation

Detailed wiki pages exist for this repository, including "Managing Reservations", "Guest Profile Management", "Booking Form & Submission", and "Glossary" of domain terms.

## Notes

- No traditional REST API layer is used — all data mutations flow through Next.js Server Actions (`"use server"`) directly calling Supabase.
- Booking status starts as `"unconfirmed"` on creation; `checked-in` status affects date availability calculations.
