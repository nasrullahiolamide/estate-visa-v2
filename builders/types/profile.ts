import { User } from "./login";
import { Nullish } from "./shared";

export type ProfileData = User;

export type Estate = {
  id: string;
  name: string;
  location: string;
  owner: string;
  phone: string;
  interests: string[];
  serviceRequestTypes: string[];
  numberOfHouses: number;
};

export type SuperAdminUpdateData = Nullish<
  Partial<{
    fullname: string;
    username: string;
    email: string;
    phone: string;
    password: string;
  }>
>;

export type AdminUpdateData = Nullish<
  Partial<{
    estatename: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
  }>
>;

export type UpdateProfileData = Partial<{
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  estatename: string;
}>;

// {
//   "id": "b66854df-56e9-4627-8c73-b6916bf2d998",
//   "email": "yinka@gmail.com",
//   "firstname": "Abdulrasheed",
//   "lastname": null,
//   "username": "Brainiac342",
//   "phone": "09038450563",
//   "picture": null,
//   "password": "$2a$10$DYWTWAsDwwBZqGkO9S1t7.V1WrpdgJScEo717xhAquQ7AZBYxCRPC",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlpbmthQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6IkFiZHVscmFzaGVlZCIsImxhc3RuYW1lIjpudWxsLCJyb2xlcyI6W3siaWQiOiI1NjNkNDUxOS0wMzRiLTQ1YjQtYmNiMC00ZWFlZWEzYmJkYTIiLCJuYW1lIjoiYWRtaW4iLCJkZXNjcmlwdGlvbiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0xMC0yNFQyMDo1Mzo1Ni44NzdaIiwidXBkYXRlZEF0IjoiMjAyNC0xMC0yNFQyMDo1Mzo1Ni44NzdaIiwiZGVsZXRlZEF0IjpudWxsfV0sInN1YiI6ImI2Njg1NGRmLTU2ZTktNDYyNy04YzczLWI2OTE2YmYyZDk5OCIsImlhdCI6MTczMDY0ODQ1OSwiZXhwIjoxNzMwNjYyODU5fQ.yf5uUemFRETzPzO0d7nHiPuTNaJ19g--1XvkmPgkuJk",
//   "status": "active",
//   "lastLogin": "2024-11-03T15:41:00.000Z",
//   "createdAt": "2024-10-30T06:00:07.413Z",
//   "updatedAt": "2024-11-03T15:40:59.000Z",
//   "deletedAt": null,
//   "roles": [
//     {
//       "id": "563d4519-034b-45b4-bcb0-4eaeea3bbda2",
//       "name": "admin",
//       "description": null,
//       "createdAt": "2024-10-24T20:53:56.877Z",
//       "updatedAt": "2024-10-24T20:53:56.877Z",
//       "deletedAt": null
//     }
//   ],
//   "estate": {
//     "id": "f7a12035-11a8-435f-afb4-95bb9cfb82bc",
//     "name": "Obaoluwa",
//     "location": "LAgos",
//     "owner": "Abdulrasheed",
//     "phone": "09038450563",
//     "interests": [
//       "Residence Management"
//     ],
//     "serviceRequestTypes": [
//       "Electricity"
//     ],
//     "numberOfHouses": 30,
//     "createdAt": "2024-10-30T06:00:07.456Z",
//     "updatedAt": "2024-10-30T06:00:07.456Z",
//     "deletedAt": null
//   }
// }
