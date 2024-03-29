"use client";
import FullHeightSection from "@/components/ui/FullHeightSection";
import { Highlight } from "@/helpers/database/collections/highlight";
import { i18n } from "@/i18n/config";
import FCi18n from "@/i18n/types/FCi18n";
import { useState } from "react";
import { dict } from "./dictionary";
import HighlightDetail from "./HighlightDetail";
import HighlightTile from "./HighlightTile";
import WithStringId from "@/types/WithStringId";

const HighlightsSection: FCi18n<{ highlights: WithStringId<Highlight>[] }> = ({
    lang,
    highlights,
}) => {
    const [activeHighlight, setActiveHighlight] = useState<
        WithStringId<Highlight> | undefined
    >();
    const localeDict = dict[lang] ?? dict[i18n.defaultLocale];
    return (
        <FullHeightSection id="highlights" className="py-4 px-3 px-sm-5">
            <h3 className="mt-5 mb-3 text-white">{localeDict.highlights}</h3>
            <p className="text-white d-block d-sm-none">
                {localeDict.touchToLearn}
            </p>
            <div className="row">
                <div className="d-none d-sm-block col-sm-6 col-md-8">
                    {!activeHighlight && (
                        <div
                            className={`
                                h-100 p-3 position-relative
                                d-flex align-items-center justify-content-center
                                text-white fw-bold
                            `}
                        >
                            <span>{localeDict.hoverToLearn}</span>
                            <div
                                className={`
                                    h-100 w-100 position-absolute
                                    border border-5 border-dashed rounded
                                    opacity-50
                                `}
                                style={{ top: 0, left: 0 }}
                            />
                        </div>
                    )}
                    {activeHighlight && (
                        <HighlightDetail
                            lang={lang}
                            highlight={activeHighlight}
                            className={`
                                px-3 py-2
                                rounded shadow
                                bg-dark bg-opacity-75
                                text-white
                            `}
                        />
                    )}
                </div>
                <div className="col-12 col-sm-6 col-md-4">
                    <ul className="list-group bg-transparent rounded">
                        {highlights.map((h, i) => {
                            return (
                                <div key={h._id}>
                                    {/* Desktop variant */}
                                    <HighlightTile
                                        lang={lang}
                                        highlight={h}
                                        active={activeHighlight?._id === h._id}
                                        onPointerEnter={() => {
                                            setActiveHighlight(h);
                                        }}
                                        isLastChild={i + 1 == highlights.length}
                                        className="d-none d-sm-block"
                                    />
                                    {/* Mobile variant */}
                                    <HighlightTile
                                        lang={lang}
                                        key={`${h._id}_mobile`}
                                        highlight={h}
                                        active={activeHighlight?._id === h._id}
                                        onClick={() => {
                                            if (
                                                activeHighlight?._id === h._id
                                            ) {
                                                setActiveHighlight(undefined);
                                            } else {
                                                setActiveHighlight(h);
                                            }
                                        }}
                                        isLastChild={i + 1 == highlights.length}
                                        className="d-block d-sm-none bg-dark"
                                    />
                                    {activeHighlight?._id === h._id && (
                                        <HighlightDetail
                                            lang={lang}
                                            highlight={h}
                                            className={`
                                                px-3 py-2 my-2
                                                rounded shadow
                                                bg-dark bg-opacity-75
                                                text-white
                                                d-block d-sm-none
                                            `}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </FullHeightSection>
    );
};

export default HighlightsSection;
