import {
  Input,
  Paragraph,
  PrimaryButton,
  SubParagraph,
} from "components/atoms";
import { communityInfo } from "features/community/community.model";
import { formatPrice } from "helpers/formatPrice";
import { useSelector } from "react-redux";

export default function ATMPayment() {
  const community = useSelector(communityInfo);
  return (
    <div>
      <Paragraph className="text-center dark:text-white">
        Choisissez le montant à verser sur ce compte
      </Paragraph>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <PrimaryButton className="w-full order-1" size="large">
          {formatPrice(50, community.currency)}
        </PrimaryButton>
        <PrimaryButton className="w-full order-3" size="large">
          {formatPrice(500, community.currency)}
        </PrimaryButton>
        <PrimaryButton className="w-full order-5" size="large">
          {formatPrice(2500, community.currency)}
        </PrimaryButton>
        <PrimaryButton className="w-full order-2" size="large">
          {formatPrice(10000, community.currency)}
        </PrimaryButton>
        <PrimaryButton className="w-full order-4" size="large">
          {formatPrice(100000, community.currency)}
        </PrimaryButton>
      </div>
      <div className="flex w-full items-center gap-4 px-10 pb-4 dark:text-white">
        <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
        <p className="text-secondary dark:text-white py-5">ou</p>
        <div className="w-full h-[1px] bg-secondary  dark:bg-white" />
      </div>
      <p className="mb-2 text-gray-700 text-center dark:text-white">
        Précisez le montant exact
      </p>
      <Input
        className="shadow-md !py-3 rounded-lg"
        placeholder="Montant exact"
        type="number"
      />
    </div>
  );
}

// 50, 500, 2500, 10000, 100000, total
