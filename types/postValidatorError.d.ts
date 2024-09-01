export type postValidatorErrorItem = {
  message: string
}

export type postValidatorError = {
  message: string
  stack: string
  statusCode: number
  statusMessage: string
  url: string
}
