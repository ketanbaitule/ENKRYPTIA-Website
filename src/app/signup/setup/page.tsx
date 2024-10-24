import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUpSetup() {
  const client = await createClient();

  const data = (await client.from("user_role").select()).data;

  if (data) redirect("/dashboard");

  async function handleSignUp(formdata: FormData) {
    "use server";
    const status = await client.from("user_role").insert({
      role: formdata.get("role"),
    });

    if (status.status == 201) {
      redirect("/dashboard");
    }

    console.log(status);
  }

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Select Role:
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-md font-medium text-gray-900"
                >
                  Select Role
                </label>
                <select
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  defaultValue={"salesperson"}
                >
                  <option value="owner">Owner</option>
                  <option value="staff">Staff</option>
                  <option value="salesperson">SalesPerson</option>
                </select>
              </div>

              <button
                formAction={handleSignUp}
                className="w-full text-black bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-2.5 text-center"
              >
                Select Role
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
