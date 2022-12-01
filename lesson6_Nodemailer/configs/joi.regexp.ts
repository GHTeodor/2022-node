export class JoiRegexp {
    public static readonly EMAIL: RegExp = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    public static readonly PASSWORD: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!_.%,&*?<>])[A-Za-z\d#$@!_.%,&*?<>]{8,}$/;
    public static readonly MONGO_ID: RegExp = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
}
