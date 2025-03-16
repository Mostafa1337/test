class LoggerError extends LoggerBasic {
    Error: string

    StackTrace: string

    constructor(FunctionName: string,Error: string, StackTrace: string) {
        super(FunctionName)
        this.Error = Error
        this.StackTrace = StackTrace
    }
}