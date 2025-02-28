class LoggerError extends LoggerBasic {
    Error: string

    StackTrace: string

    constructor(ModuleName: string, FunctionName: string,Error: string, StackTrace: string) {
        super(ModuleName,FunctionName)
        this.Error = Error
        this.StackTrace = StackTrace
    }
}