export default class ApiResponse<TData> {
  statusCode: number;
  data: TData;
  message: string;

  constructor(statusCode: number, data: TData, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
