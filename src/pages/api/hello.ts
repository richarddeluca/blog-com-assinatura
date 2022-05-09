// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

// interface Data {
//     id: number;
//     name: string
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const users = [
    { id: 1, name: 'richard' },
    { id: 2, name: 'richared' },
    { id: 3, name: 'richarde' }

  ]
  res.status(200).json(users)
}
