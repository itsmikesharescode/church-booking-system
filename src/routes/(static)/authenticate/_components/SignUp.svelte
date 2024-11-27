<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { signUpSchema, type SignUpSchema } from '../authenticate-schema';
  import * as Select from '$lib/components/ui/select/index.js';
  import Button from '$lib/components/ui/button/button.svelte';
  import type { Result } from '$lib/types';
  import { toast } from 'svelte-sonner';
  import { Loader } from 'lucide-svelte';
  import CalendarPicker from '$lib/components/gen/CalendarPicker.svelte';
  import SelectPicker from '$lib/components/gen/SelectPicker.svelte';

  interface Props {
    signUpForm: SuperValidated<Infer<SignUpSchema>>;
  }

  const { signUpForm }: Props = $props();

  const form = superForm(signUpForm, {
    validators: zodClient(signUpSchema),
    id: crypto.randomUUID(),
    onUpdate({ result }) {
      const { status, data } = result as Result<{ msg: string }>;

      switch (status) {
        case 200:
          toast.success('', { description: data.msg });
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
    }
  });

  const { form: formData, enhance, submitting } = form;

  const selectedGender = $derived(
    $formData.gender ? { label: $formData.gender, value: $formData.gender } : undefined
  );
</script>

<div class="flex min-h-screen flex-col justify-center p-[1rem] sm:p-[2rem]">
  <form
    method="POST"
    action="?/signUpEvent"
    use:enhance
    class="mx-auto flex flex-col items-center gap-[1rem]"
  >
    <div class="flex flex-col gap-2.5">
      <p class="text-center text-3xl font-bold">Sign Up</p>
      <p class="text-center text-sm leading-7 text-muted-foreground">
        Sign up to church booking system
      </p>
    </div>

    <section class="grid max-w-fit gap-[1rem] md:grid-cols-2">
      <div class="min-w-[330px] max-w-[330px]">
        <Form.Field {form} name="firstName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>First Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.firstName}
                placeholder="Enter your first name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="middleName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Middle Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.middleName}
                placeholder="Enter your middle name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="lastName">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Last Name</Form.Label>
              <Input
                {...props}
                bind:value={$formData.lastName}
                placeholder="Enter your last name"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="birthDate">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Birth Date</Form.Label>
              <CalendarPicker type="single" bind:valueString={$formData.birthDate} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="gender">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Gender</Form.Label>
              <SelectPicker
                selections={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' }
                ]}
                {...props}
                bind:selected={$formData.gender}
              />
              <input hidden bind:value={$formData.gender} name={props.name} />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>

      <div class="min-w-[330px] max-w-[330px]">
        <Form.Field {form} name="mobileNum">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Mobile Number</Form.Label>
              <Input
                {...props}
                bind:value={$formData.mobileNum}
                placeholder="Enter your mobile number"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="email">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Email</Form.Label>
              <Input {...props} bind:value={$formData.email} placeholder="Enter your email" />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="pwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.pwd}
                placeholder="Enter your password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>

        <Form.Field {form} name="confirmPwd">
          <Form.Control>
            {#snippet children({ props })}
              <Form.Label>Confirm Password</Form.Label>
              <Input
                type="password"
                {...props}
                bind:value={$formData.confirmPwd}
                placeholder="Confirm your password"
              />
            {/snippet}
          </Form.Control>
          <Form.FieldErrors />
        </Form.Field>
      </div>
    </section>

    <div class="w-full max-w-[330px]">
      <div class="flex flex-col gap-[1rem]">
        <Form.Button disabled={$submitting} class="relative">
          {#if $submitting}
            <div
              class="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-sm bg-primary"
            >
              <Loader class="h-[15px] w-[15px] animate-spin" />
            </div>
          {/if}
          Sign Up
        </Form.Button>

        <div class="flex items-center gap-[0.625rem]">
          <div class="h-[1px] w-full bg-slate-400"></div>
          <span>Or</span>
          <div class="h-[1px] w-full bg-slate-400"></div>
        </div>

        <Button variant="secondary" href="/authenticate">Sign In Here</Button>
      </div>
    </div>
  </form>
</div>
