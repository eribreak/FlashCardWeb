import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/config/axios.config";
import { useRouter } from "next/navigation";
import authApi from "@/lib/authApi";

const formSchema = z
  .object({
    email: z.string().email(),
    usename: z.string().min(6),
    password: z.string().min(8).max(20),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"],
    }
  )
  .refine(
    (data) => {
      let containNum = data.password.search(/[0-9]/) == -1 ? false : true;
      return containNum;
    },
    {
      message: "Password must contain number",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      let containNum =
        data.password.search(/[^A-Za-z0-9]/) == -1 ? false : true;
      return containNum;
    },
    {
      message: "Password must contain at least one specail character",
      path: ["password"],
    }
  );

const SignUpForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // api
    //   .post("/auth/sign-up", {
    //     email: values.email,
    //     password: values.password,
    //     name: values.usename,
    //   })
    //   .then((res) => {
    //     localStorage.setItem("userData", JSON.stringify(res.data?.data));
    //     localStorage.setItem("user", JSON.stringify(res.data?.data?.id));
    //     router.push("/home");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    authApi
      .SignUp(values.usename, values.password, values.email)
      .then((res) => {
        localStorage.setItem("userData", JSON.stringify(res.data?.data));
        localStorage.setItem("user", JSON.stringify(res.data?.data?.id));
        router.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-7 max-w-md w-full flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="bg-stone-200 rounded-full border-none focus:border-pink"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="usename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usename</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your usename"
                  {...field}
                  className="bg-stone-200 rounded-full border-none focus:border-pink"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="bg-stone-200 rounded-full border-none focus:border-pink"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirm</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="bg-stone-200 rounded-full border-none focus:border-pink"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-white-400 text-purple-500 hover:bg-purple-500 hover:text-white rounded-full border-2 border-purple-500"
        >
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
