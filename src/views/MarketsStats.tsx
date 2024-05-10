import { useState } from 'react';

import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { STRING_KEYS } from '@/constants/localization';
import { MarketFilters, MarketSorting } from '@/constants/markets';

import { useStringGetter } from '@/hooks';

import { breakpoints } from '@/styles';
import { layoutMixins } from '@/styles/layoutMixins';

import { Tag } from '@/components/Tag';
import { ToggleGroup } from '@/components/ToggleGroup';

import { setMarketFilter } from '@/state/perpetuals';

import { ExchangeBillboards } from './ExchangeBillboards';
import { MarketsCompactTable } from './tables/MarketsCompactTable';

interface MarketsStatsProps {
  className?: string;
}

export const MarketsStats = (props: MarketsStatsProps) => {
  const { className } = props;
  const stringGetter = useStringGetter();
  const dispatch = useDispatch();
  const [sorting, setSorting] = useState(MarketSorting.GAINERS);

  const setNewFilter = () => {
    dispatch(setMarketFilter(MarketFilters.NEW));
  };

  return (
    <Styled.MarketsStats className={className}>
      <ExchangeBillboards />
      <Styled.Section>
        <Styled.SectionHeader>
          <Styled.RecentlyListed>
            {stringGetter({ key: STRING_KEYS.RECENTLY_LISTED })}
            <Styled.NewTag>{stringGetter({ key: STRING_KEYS.NEW })}</Styled.NewTag>
          </Styled.RecentlyListed>
        </Styled.SectionHeader>
        <MarketsCompactTable filters={MarketFilters.NEW} />
      </Styled.Section>
      <Styled.Section>
        <Styled.SectionHeader>
          <h4>{stringGetter({ key: STRING_KEYS.BIGGEST_MOVERS })}</h4>
          <Tag>{stringGetter({ key: STRING_KEYS._24H })}</Tag>

          <Styled.ToggleGroupContainer>
            <ToggleGroup
              items={[
                {
                  label: stringGetter({ key: STRING_KEYS.GAINERS }),
                  value: 'gainers',
                },
                {
                  label: stringGetter({ key: STRING_KEYS.LOSERS }),
                  value: 'losers',
                },
              ]}
              value={sorting}
              onValueChange={setSorting}
            />
          </Styled.ToggleGroupContainer>
        </Styled.SectionHeader>
        <MarketsCompactTable sorting={sorting} />
      </Styled.Section>
    </Styled.MarketsStats>
  );
};

const Styled = {
  MarketsStats: styled.section`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;

    @media ${breakpoints.desktopSmall} {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    @media ${breakpoints.tablet} {
      ${layoutMixins.column}
    }
  `,
  Section: styled.div`
    background: var(--color-layer-3);
    border-radius: 0.625rem;
  `,
  RecentlyListed: styled.h4`
    display: flex;
    align-items: center;
    gap: 0.375rem;
  `,
  NewTag: styled(Tag)`
    background-color: var(--color-accent-faded);
    color: var(--color-accent);
    text-transform: uppercase;
  `,
  ToggleGroupContainer: styled.div`
    ${layoutMixins.row}
    margin-left: auto;

    & button {
      --button-toggle-off-backgroundColor: var(--color-layer-3);
      --button-toggle-off-textColor: var(--color-text-1);
      --border-color: var(--color-layer-6);
      --button-height: 1.75rem;
      --button-padding: 0 0.75rem;
      --button-font: var(--font-mini-book);
    }
  `,
  SectionHeader: styled.div`
    ${layoutMixins.row}

    justify-content: space-between;
    padding: 1.125rem 1.5rem;
    gap: 0.375rem;
    height: 4rem;

    & h4 {
      font: var(--font-base-medium);
      color: var(--color-text-2);
    }
  `,
};
