import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString,  Matches, MaxLength, ValidateIf } from "class-validator";
import { Usertypes } from "../Models/Usertype";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { AutoMap } from "@automapper/classes";
import { BadValidationException, ClassValidatorExceptionDto } from "src/Common/ClassValidatorException.dto";

export class UserUpdateDto {
    @IsString()
    @MaxLength(50,{message:"Firstname maximum length is 50"})
    @IsNotEmpty({message:"Firstname must be not empty"})
    @ApiProperty({
        name:"FirstName",
        maxLength:50,
        type:"string",
        nullable:false,
        required:true
    })
    @AutoMap()
    FirstName:string

    @IsString()
    @MaxLength(50,{message:"lastName maximum length is 50"})
    @IsNotEmpty({message:"lastName must be not empty"})
    @ApiProperty({
        name:"LastName",
        maxLength:50,
        type:"string",
        nullable:false,
        required:true
    })
    @AutoMap()
    LastName:string

    @IsString()
    @MaxLength(50)
    @IsOptional()
    @ApiProperty({
        name:"StudentId",
        maxLength:50,
        type:"string",
        nullable:true,
        required:false,
        default:null
    })
    @AutoMap()
    StudentId?: string = null;

    @IsString()
    @Matches(/^1[0-9]{9}$/)
    @IsNotEmpty()
    @ApiProperty({
        name: "PhoneNumber",
        type: "string",
        nullable: false,
        required: true,
        example: "1203087667",
        pattern: "/^[0-9]{10}$/"
    })
    @AutoMap()
    PhoneNumber: string;

    //TODO VALIDATE COUNTRY CODE
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    @ApiProperty({
        name:"CountryCode",
        type:"string",
        nullable:false,
        required:true,
        example:"+20",
        pattern:"/^(\+?\d{1,3}|\d{1,4})$/"
    })
    @AutoMap()
    CountryCode: string;


    @IsEnum(Usertypes)
    @Transform(({ value }) => {
        if(value && !Object.values(Usertypes).filter(x=> typeof x === "string").includes(value.toString()))
            throw new BadValidationException(
                new ClassValidatorExceptionDto("Enter valid Usertype","Usertypes")
            )
        
        return Usertypes[value.toUpperCase()]
    })
    @ValidateIf(
        (o:UserUpdateDto) => {
            const isValidStudent:boolean = (o.Usertype === Usertypes.STUDENT && !o.StudentId)
            const isValidOther:boolean = (o.Usertype !== Usertypes.STUDENT && (o.StudentId ? true : false))

            if(isValidStudent) 
            {
                throw new BadValidationException(
                    new ClassValidatorExceptionDto("All Students must provide Student Id","Usertype")
                )
            }


            if(isValidOther) 
            {
                throw new BadValidationException(
                    new ClassValidatorExceptionDto("Students only can provide Student Id","Usertype")
                )
            }

            return isValidStudent || isValidOther
        }
        ,{always:true})
    @IsOptional()
    @ApiProperty({
        name:"Usertype",
        type:"string",
        required:false,
        default:Usertypes[Usertypes.STUDENT],
        enum:(Object.values(Usertypes).filter(x=> typeof x === "string")),
    })
    @AutoMap()
    Usertype: Usertypes = Usertypes.STUDENT;
}