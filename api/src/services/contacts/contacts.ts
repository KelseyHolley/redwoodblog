import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  //first arge is value we want to check, second is name prop from input, third is object containing validation directives
  validate(input.email, 'email', { email: true })
  return db.contact.create({
    data: input,
  })
}
