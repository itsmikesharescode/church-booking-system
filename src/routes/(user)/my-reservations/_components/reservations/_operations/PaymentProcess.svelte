<script lang="ts">
  import { enhance } from '$app/forms';
  import type { Result, UserQType } from '$lib/types';
  import type { SubmitFunction } from '@sveltejs/kit';
  import Loader from 'lucide-svelte/icons/loader';
  import type { CreateInvoiceRequest, Invoice } from 'xendit-node/invoice/models';
  import { page } from '$app/stores';
  import { fromUserState } from '../../../../../_states/fromUserState.svelte';
  import { toast } from 'svelte-sonner';
  import Badge from '$lib/components/ui/badge/badge.svelte';

  interface Props {
    reservation: UserQType['reservations'][number];
  }

  const { ...props }: Props = $props();

  const user = fromUserState();

  const paymentRequirements = () => {
    const userRef = user.getUser();

    if (!userRef) return '';

    const invoice: CreateInvoiceRequest = {
      externalId: `${userRef.id}/${props.reservation.id}`,
      description: `Paying reservation for ${props.reservation.event_name} `,
      amount: props.reservation.price,
      currency: 'PHP',
      customer: {
        givenNames: userRef.user_metadata.firstName,
        surname: userRef.user_metadata.lastName,
        email: userRef.email,
        mobileNumber: userRef.user_metadata.mobileNum
      },
      customerNotificationPreference: {
        invoicePaid: ['email', 'whatsapp']
      },
      successRedirectUrl: `${$page.url.origin}/my-payments`,
      failureRedirectUrl: 'example.com/failure'
    };

    return JSON.stringify(invoice);
  };

  let paymentLoader = $state(false);
  const paymentProcessEvent: SubmitFunction = () => {
    paymentLoader = true;
    return async ({ result, update }) => {
      const { status, data } = result as Result<{ msg: string; xenditData: Invoice }>;

      switch (status) {
        case 200:
          window.location.href = data.xenditData.invoiceUrl;
          break;

        case 401:
          toast.error('', { description: data.msg });
          break;
      }
      await update();
      paymentLoader = false;
    };
  };
</script>

<form method="post" action="?/paymentProcessEvent" use:enhance={paymentProcessEvent}>
  <input name="invoiceRef" type="hidden" value={paymentRequirements()} />
  <button disabled={paymentLoader} class="relative flex items-center gap-2.5">
    {#if paymentLoader}
      <Badge class="flex items-center gap-2.5">
        Please wait...
        <Loader class="h-[15px] w-[15px] animate-spin" />
      </Badge>
    {:else}
      <Badge>Proceed Payment of ₱ {props.reservation.price.toLocaleString()}</Badge>
    {/if}
  </button>
</form>
