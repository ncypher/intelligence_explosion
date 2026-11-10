// Supplemental links reviewed November 10, 2026. Destinations were found in primary sources; some publishers restrict access.
const DISCOVERY_RESOURCES = {
  "fable-mythos-52-science": {
    "resources": [
      {
        "title": "Inside the 1,000-agent Fermat formalization",
        "url": "https://claude.dev/blog/safely-scaling-multi-agent-teams-with-fable-5-2/",
        "type": "Research",
        "note": "Anthropic's account of the experiment, setup and limits; formalization of an existing theorem."
      },
      {
        "title": "Electronic prototypes and demonstrations",
        "url": "https://www.anthropic.com/research/claude-electronics-design",
        "type": "Demo",
        "note": "Official illustrated walkthrough of three prototypes assembled and tested by human engineers."
      }
    ]
  },
  "aaronson-ambainis-psi": {
    "resources": [
      {
        "title": "Proofs, paper and Lean code",
        "url": "https://github.com/physical-superintelligence/aaronson-ambainis",
        "type": "Code",
        "note": "PSI's repository linked from its research announcement; inspect the argument and formal proof artifacts."
      }
    ]
  },
  "biobasicsbench": {
    "resources": [],
    "coverageNote": "The primary article includes worked examples and raw-evidence illustrations. No separate public dataset, code repository or video was located in this review."
  },
  "distributed-biology-atlas": {
    "resources": [
      {
        "title": "Distributed-agent reasoning atlas",
        "url": "https://github.com/jinlabneurogenomics/distributed_agent",
        "type": "Code",
        "note": "Research team's repository for the distributed biological reasoning study."
      },
      {
        "title": "Distributed AI agents study",
        "url": "https://www.biorxiv.org/content/10.64898/2026.10.15.759436v1",
        "type": "Paper",
        "note": "Preprint linked by the official announcement; biological leads still require experimental follow-up."
      }
    ]
  },
  "chefnmr2": {
    "resources": [
      {
        "title": "Try the ChefNMR2 web app",
        "url": "https://huggingface.co/spaces/ziyux123/chefnmr2",
        "type": "Demo",
        "note": "Author-linked interactive molecular-structure prediction app; availability depends on its hosting."
      },
      {
        "title": "ChefNMR2 code",
        "url": "https://github.com/ml-struct-bio/chefnmr2",
        "type": "Code",
        "note": "Author repository linked from Edison Scientific's research page."
      }
    ]
  },
  "autodna": {
    "resources": [
      {
        "title": "AutoDNA software and hardware repository",
        "url": "https://github.com/IPADS-X/AutoDNA",
        "type": "Code",
        "note": "Official project repository containing software, firmware, scheduling and data folders."
      }
    ]
  },
  "halicin": {
    "resources": [
      {
        "title": "Read the full antibiotic-discovery study",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8349178/",
        "type": "Paper",
        "note": "Open full text of the Cell paper describing the screen and experimental results."
      }
    ]
  },
  "alphafold2": {
    "resources": [
      {
        "title": "AlphaFold 2 code and usage guide",
        "url": "https://github.com/google-deepmind/alphafold",
        "type": "Code",
        "note": "Google DeepMind's research implementation and documentation."
      },
      {
        "title": "Explore predicted protein structures",
        "url": "https://alphafold.ebi.ac.uk/",
        "type": "Dataset",
        "note": "EMBL-EBI's searchable structure database; predictions are not experimental structure determinations."
      }
    ]
  },
  "alphafold-db": {
    "resources": [
      {
        "title": "Browse the AlphaFold Protein Structure Database",
        "url": "https://alphafold.ebi.ac.uk/",
        "type": "Dataset",
        "note": "Search and inspect predicted protein structures in the live database."
      },
      {
        "title": "Download datasets",
        "url": "https://alphafold.ebi.ac.uk/download",
        "type": "Dataset",
        "note": "Bulk-download entry point maintained by EMBL-EBI."
      }
    ]
  },
  "fusion-control": {
    "resources": [
      {
        "title": "Magnetic control of tokamak plasmas",
        "url": "https://www.nature.com/articles/s41586-021-04301-9",
        "type": "Paper",
        "note": "Nature paper on deep reinforcement learning for plasma control."
      },
      {
        "title": "EPFL's illustrated research account",
        "url": "https://news.epfl.ch/news/epfl-and-deepmind-use-ai-to-control-plasmas-for-nu/",
        "type": "Research",
        "note": "The collaborating plasma laboratory explains the experiment."
      }
    ]
  },
  "alphatensor": {
    "resources": [
      {
        "title": "AlphaTensor algorithms and notebooks",
        "url": "https://github.com/google-deepmind/alphatensor",
        "type": "Code",
        "note": "Research repository for the discovered matrix-multiplication algorithms."
      }
    ]
  },
  "abaucin": {
    "resources": [
      {
        "title": "Read the abaucin study",
        "url": "https://www.nature.com/articles/s41589-023-01349-8",
        "type": "Paper",
        "note": "Nature Chemical Biology paper on an antibiotic candidate targeting Acinetobacter baumannii."
      },
      {
        "title": "Explore the study's sequencing data",
        "url": "https://www.ncbi.nlm.nih.gov/bioproject/PRJNA884833",
        "type": "Dataset",
        "note": "NCBI BioProject associated with the research."
      }
    ]
  },
  "alphadev": {
    "resources": [
      {
        "title": "AlphaDev research artifacts",
        "url": "https://github.com/google-deepmind/alphadev",
        "type": "Code",
        "note": "Google DeepMind's archived research repository; read-only artifacts remain available."
      }
    ]
  },
  "rfdiffusion": {
    "resources": [
      {
        "title": "RFdiffusion code and tutorials",
        "url": "https://github.com/RosettaCommons/RFdiffusion",
        "type": "Code",
        "note": "RosettaCommons' implementation, model setup and examples."
      }
    ]
  },
  "graphcast": {
    "resources": [
      {
        "title": "GraphCast implementation and notebooks",
        "url": "https://github.com/google-deepmind/weathernext/blob/main/docs/weathernext1_graph/README.md",
        "type": "Code",
        "note": "GraphCast documentation in the renamed WeatherNext repository."
      }
    ]
  },
  "gnome": {
    "resources": [
      {
        "title": "Explore the GNoME data release",
        "url": "https://github.com/google-deepmind/materials_discovery/blob/main/DATASET.md",
        "type": "Dataset",
        "note": "Structures, calculated properties and download instructions; stability predictions are not synthesis demonstrations."
      },
      {
        "title": "Visualize GNoME structures",
        "url": "https://github.com/google-deepmind/materials_discovery/blob/main/notebooks/Visualize_GNoME_Structures.ipynb",
        "type": "Code",
        "note": "Research notebook for inspecting the released crystal structures."
      }
    ]
  },
  "funsearch": {
    "resources": [
      {
        "title": "FunSearch implementation and discoveries",
        "url": "https://github.com/google-deepmind/funsearch",
        "type": "Code",
        "note": "Implementation, cap-set constructions and notebooks from the research team."
      }
    ]
  },
  "alphageometry": {
    "resources": [
      {
        "title": "Run and inspect AlphaGeometry",
        "url": "https://github.com/google-deepmind/alphageometry",
        "type": "Code",
        "note": "Code, examples and reproduction instructions for the original geometry system."
      }
    ]
  },
  "alphafold3": {
    "resources": [
      {
        "title": "AlphaFold 3 inference pipeline",
        "url": "https://github.com/google-deepmind/alphafold3",
        "type": "Code",
        "note": "Official implementation; consult the repository for model access and usage terms."
      }
    ]
  },
  "esm3": {
    "resources": [
      {
        "title": "ESM3 model guide",
        "url": "https://github.com/Biohub/esm/blob/main/_assets/ESM3_README.md",
        "type": "Code",
        "note": "Current official ESM3 documentation covering sequence, structure and function generation."
      }
    ]
  },
  "gencast": {
    "resources": [
      {
        "title": "Read the GenCast paper",
        "url": "https://www.nature.com/articles/s41586-024-08252-9",
        "type": "Paper",
        "note": "Nature study on probabilistic weather forecasting with machine learning."
      },
      {
        "title": "WeatherNext research code",
        "url": "https://github.com/google-deepmind/weathernext",
        "type": "Code",
        "note": "The former GraphCast repository now contains the broader weather-model research collection."
      }
    ]
  },
  "mattergen": {
    "resources": [
      {
        "title": "MatterGen implementation and data",
        "url": "https://github.com/microsoft/mattergen",
        "type": "Code",
        "note": "Microsoft's official implementation, pretrained-model instructions and data release."
      }
    ]
  },
  "ai-co-scientist": {
    "resources": [
      {
        "title": "Towards an AI co-scientist",
        "url": "https://arxiv.org/abs/2502.18864",
        "type": "Paper",
        "note": "Technical preprint describing the multi-agent system and biomedical evaluations."
      }
    ]
  },
  "evo2": {
    "resources": [
      {
        "title": "Explore Evo Designer",
        "url": "https://arcinstitute.org/tools/evo/evo-designer",
        "type": "Demo",
        "note": "Arc Institute’s interactive sequence explorer."
      },
      {
        "title": "Evo 2 code and model documentation",
        "url": "https://github.com/arcinstitute/evo2",
        "type": "Code",
        "note": "Official implementation and model information."
      },
      {
        "title": "Watch Arc’s Evo 2 introduction",
        "url": "https://www.youtube.com/watch?v=Q1WNmfHz5sA",
        "type": "Video",
        "note": "Video embedded in Arc Institute’s launch article."
      }
    ]
  },
  "alphaevolve": {
    "resources": [
      {
        "title": "Read the AlphaEvolve technical report",
        "url": "https://storage.googleapis.com/deepmind-media/DeepMind.com/Blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/AlphaEvolve.pdf",
        "type": "Paper",
        "note": "PDF describing the evolutionary coding system."
      }
    ]
  },
  "robin": {
    "resources": [
      {
        "title": "Watch the Robin demonstration",
        "url": "https://player.vimeo.com/video/1085953650",
        "type": "Video",
        "note": "FutureHouse’s demonstration of its research workflow."
      },
      {
        "title": "Explore Robin’s code and trajectories",
        "url": "https://github.com/Future-House/robin",
        "type": "Code",
        "note": "Official repository with example research trajectories."
      },
      {
        "title": "Read the published Robin paper",
        "url": "https://www.nature.com/articles/s41586-026-10652-y",
        "type": "Paper",
        "note": "Nature research article on the multi-agent system."
      }
    ]
  },
  "aurora-earth": {
    "resources": [
      {
        "title": "Explore Aurora’s model documentation",
        "url": "https://microsoft.github.io/aurora/intro.html",
        "type": "Code",
        "note": "Official documentation with code and model access."
      },
      {
        "title": "Read the Earth-system foundation-model paper",
        "url": "https://www.nature.com/articles/s41586-025-09005-y",
        "type": "Paper",
        "note": "Published methods and evaluation."
      }
    ]
  },
  "weatherlab-cyclones": {
    "resources": [
      {
        "title": "Explore Weather Lab forecasts",
        "url": "https://deepmind.google.com/science/weatherlab",
        "type": "Demo",
        "note": "Interactive experimental forecasts; Google sign-in may be required."
      }
    ]
  },
  "alphagenome": {
    "resources": [
      {
        "title": "AlphaGenome research code",
        "url": "https://github.com/google-deepmind/alphagenome_research",
        "type": "Code",
        "note": "Official research implementation."
      },
      {
        "title": "Read the AlphaGenome Nature paper",
        "url": "https://www.nature.com/articles/s41586-025-10014-0",
        "type": "Paper",
        "note": "Published methods and variant-prediction evaluation."
      }
    ]
  },
  "deep-think-imo": {
    "resources": [
      {
        "title": "Read Gemini’s IMO 2025 solutions",
        "url": "https://storage.googleapis.com/deepmind-media/gemini/IMO_2025.pdf",
        "type": "Paper",
        "note": "The submitted mathematical solutions, in PDF."
      },
      {
        "title": "Watch a conversation on AI and mathematics",
        "url": "https://www.youtube.com/watch?v=TgS0nFeYul8",
        "type": "Video",
        "note": "Background video linked by the DeepMind IMO announcement."
      }
    ]
  },
  "alphaearth": {
    "resources": [
      {
        "title": "Explore the Satellite Embedding dataset",
        "url": "https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL",
        "type": "Dataset",
        "note": "Data catalog with bands, examples and access information."
      },
      {
        "title": "Read the AlphaEarth Foundations preprint",
        "url": "https://arxiv.org/pdf/2507.22291",
        "type": "Paper",
        "note": "Technical report linked by the research team."
      }
    ]
  },
  "opencrispr-1": {
    "resources": [
      {
        "title": "Explore OpenCRISPR’s released resources",
        "url": "https://github.com/Profluent-AI/OpenCRISPR",
        "type": "Code",
        "note": "Official project repository and research materials."
      }
    ]
  },
  "generative-antibiotics": {
    "resources": [
      {
        "title": "Read the generative antibiotics study",
        "url": "https://www.cell.com/cell/abstract/S0092-8674%2825%2900855-4",
        "type": "Paper",
        "note": "Cell paper linked by MIT; publisher access restrictions may apply."
      }
    ]
  },
  "deep-loop-shaping": {
    "resources": [
      {
        "title": "Read the Deep Loop Shaping preprint",
        "url": "https://arxiv.org/abs/2509.14016",
        "type": "Paper",
        "note": "Open manuscript on controlling a gravitational-wave observatory."
      }
    ]
  },
  "unstable-singularities": {
    "resources": [
      {
        "title": "Read Discovery of Unstable Singularities",
        "url": "https://arxiv.org/abs/2509.14185",
        "type": "Paper",
        "note": "Preprint describing the discovered families of fluid singularities."
      }
    ]
  },
  "crest": {
    "resources": [
      {
        "title": "Read the CRESt research paper",
        "url": "https://www.nature.com/articles/s41586-025-09640-5",
        "type": "Paper",
        "note": "Nature study linked by MIT’s announcement."
      },
      {
        "title": "Watch the CRESt demonstration",
        "url": "https://www.youtube.com/watch?v=0cV5zbilK4Y",
        "type": "Video",
        "note": "Research demonstration embedded in MIT’s article."
      }
    ]
  },
  "c2s-scale": {
    "resources": [
      {
        "title": "Explore the C2S-Scale model",
        "url": "https://huggingface.co/vandijklab/C2S-Scale-Gemma-2-27B",
        "type": "Code",
        "note": "Official model card, weights and usage examples."
      },
      {
        "title": "Cell2Sentence code and tutorials",
        "url": "https://github.com/vandijklab/cell2sentence",
        "type": "Code",
        "note": "Yale lab’s implementation and tutorials."
      }
    ]
  },
  "torax-cfs": {
    "resources": [
      {
        "title": "Explore the TORAX simulator",
        "url": "https://torax.readthedocs.io/",
        "type": "Code",
        "note": "Official documentation, tutorials and simulation examples."
      }
    ]
  },
  "alphaevolve-math-scale": {
    "resources": [
      {
        "title": "Explore the mathematical problem collection",
        "url": "https://google-deepmind.github.io/alphaevolve_repository_of_problems/",
        "type": "Demo",
        "note": "Browse problems, results and supporting artifacts."
      },
      {
        "title": "Read Terence Tao’s research commentary",
        "url": "https://terrytao.wordpress.com/2025/11/05/mathematical-exploration-and-discovery-at-scale/",
        "type": "Background",
        "note": "A coauthor explains the experiments and their limits."
      }
    ]
  },
  "rfantibody": {
    "resources": [
      {
        "title": "Explore RFantibody’s code",
        "url": "https://github.com/RosettaCommons/RFantibody",
        "type": "Code",
        "note": "Official antibody-design implementation."
      },
      {
        "title": "Read the RFantibody Nature paper",
        "url": "https://www.nature.com/articles/s41586-025-09721-5",
        "type": "Paper",
        "note": "Published methods and laboratory evaluation."
      }
    ]
  },
  "alphaproof-nature": {
    "resources": [
      {
        "title": "Read the full AlphaProof manuscript",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC12999475/",
        "type": "Paper",
        "note": "Free full-text version in PubMed Central."
      }
    ]
  },
  "weathernext2": {
    "resources": [
      {
        "title": "Explore WeatherNext 2 forecast data",
        "url": "https://developers.google.com/earth-engine/datasets/catalog/projects_gcp-public-data-weathernext_assets_weathernext_2_0_0",
        "type": "Dataset",
        "note": "Earth Engine data catalog and usage examples."
      }
    ]
  },
  "aletheia-erdos": {
    "resources": [
      {
        "title": "Read Towards Autonomous Mathematics Research",
        "url": "https://arxiv.org/abs/2602.10177",
        "type": "Paper",
        "note": "The Aletheia research report."
      },
      {
        "title": "Explore scientific research case studies",
        "url": "https://arxiv.org/abs/2602.03837",
        "type": "Paper",
        "note": "Companion paper on human-AI research workflows."
      }
    ]
  },
  "gluon-amplitudes": {
    "resources": [
      {
        "title": "Read the gluon-amplitudes preprint",
        "url": "https://arxiv.org/abs/2602.12176",
        "type": "Paper",
        "note": "The authors’ mathematical derivation and consistency checks."
      }
    ]
  },
  "melissa-forecast": {
    "resources": [
      {
        "title": "Watch the Hurricane Melissa forecast story",
        "url": "https://www.youtube.com/watch?v=wd5ZZV8if54",
        "type": "Video",
        "note": "Google DeepMind’s film, “Predicting a historic storm earlier with WeatherNext.”"
      },
      {
        "title": "Explore Weather Lab",
        "url": "https://deepmind.google.com/science/weatherlab",
        "type": "Demo",
        "note": "Experimental forecast visualization; sign-in may be required."
      }
    ]
  },
  "unit-distance-disproof": {
    "resources": [
      {
        "title": "Read the unit-distance proof",
        "url": "https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-proof.pdf",
        "type": "Paper",
        "note": "The human-edited proof manuscript."
      },
      {
        "title": "Read the mathematicians’ companion remarks",
        "url": "https://cdn.openai.com/pdf/74c24085-19b0-4534-9c90-465b8e29ad73/unit-distance-remarks.pdf",
        "type": "Background",
        "note": "External mathematicians explain and contextualize the argument."
      }
    ]
  },
  "electrolytegpt": {
    "resources": [
      {
        "title": "Electrolyte formulation research paper",
        "url": "https://pubs.acs.org/doi/10.1021/jacsau.5c01628",
        "type": "Paper",
        "note": "JACS Au paper linked by the University of Chicago; publisher access may be restricted."
      }
    ]
  },
  "openai-ten-advances": {
    "resources": [
      {
        "title": "Read the ten proofs",
        "url": "https://cdn.openai.com/pdf/ten-proofs-oai.pdf",
        "type": "Paper",
        "note": "The full research manuscript (PDF)."
      },
      {
        "title": "Inspect the Lean certificates",
        "url": "https://github.com/openai/ten-proofs",
        "type": "Code",
        "note": "Formal proof artifacts accompanying the release."
      }
    ]
  },
  "weathernext-cyclones": {
    "resources": [
      {
        "title": "Operational tropical cyclone forecasting with AI",
        "url": "https://www.nature.com/articles/s41586-026-10953-2",
        "type": "Paper",
        "note": "The Nature study behind the cyclone-forecasting results."
      },
      {
        "title": "WeatherNext model code",
        "url": "https://github.com/google-deepmind/weathernext",
        "type": "Code",
        "note": "Google DeepMind's public model repository."
      }
    ]
  },
  "weathernext3": {
    "resources": [
      {
        "title": "WeatherNext 3 technical paper",
        "url": "https://arxiv.org/abs/2609.03582",
        "type": "Paper",
        "note": "Research preprint describing forecasts from raw observations."
      }
    ]
  },
  "alphagenome-atlas": {
    "resources": [
      {
        "title": "Explore AlphaGenome Atlas",
        "url": "https://alphagenome.google/atlas",
        "type": "Demo",
        "note": "Official portal for browsing predicted variant effects; research use."
      },
      {
        "title": "AlphaGenome Atlas explained",
        "url": "https://www.youtube.com/watch?v=U0aToL5C-bQ",
        "type": "Video",
        "note": "Google DeepMind's visual introduction, embedded in the official announcement."
      },
      {
        "title": "AlphaGenome API and examples",
        "url": "https://github.com/google-deepmind/alphagenome",
        "type": "Code",
        "note": "Programmatic access and research examples."
      }
    ]
  },
  "navier-stokes-2026": {
    "resources": [
      {
        "title": "Read the proposed Navier–Stokes proof",
        "url": "https://cdn.openai.com/pdf/32d9f210-8b73-45e0-91bc-82a30aef8a9a/navier-stokes.pdf",
        "type": "Paper",
        "note": "The announced analytical argument (PDF), provided for examination."
      },
      {
        "title": "Inspect Navier–Stokes and Euler formalizations",
        "url": "https://github.com/openai/NavierStokesAndEuler",
        "type": "Code",
        "note": "Lean proof artifacts; formalization is distinct from community acceptance."
      }
    ]
  },
  "bootloops": {
    "resources": [
      {
        "title": "Explore the BootLoops research toolkit",
        "url": "https://bootloops.ai/",
        "type": "Research",
        "note": "Project hub connecting tools, manuscripts and scientific applications."
      },
      {
        "title": "Inspect the released BootLoops harness",
        "url": "https://github.com/BootLoops-ai/bootloops/tree/66b680ce742e654cfe86da4f072a69061fe182b1",
        "type": "Code",
        "note": "The source snapshot linked by the author's announcement."
      }
    ]
  },
  "openai-math-collection": {
    "resources": [
      {
        "title": "Browse the manuscript map",
        "url": "https://github.com/openai/math/blob/main/CONTENTS.md",
        "type": "Research",
        "note": "Find individual manuscripts and supporting materials."
      },
      {
        "title": "Follow revisions and withdrawals",
        "url": "https://github.com/openai/math/blob/main/history.md",
        "type": "Research",
        "note": "Read the collection's change history alongside its claims."
      }
    ]
  },
  "antigravity-peptide": {
    "resources": [
      {
        "title": "Watch the antimicrobial-search walkthrough",
        "url": "https://www.youtube.com/watch?v=JDyatKs10Kk",
        "type": "Video",
        "note": "Official demonstration of the computational workflow; lab validation was pending."
      }
    ]
  },
  "art-enzyme": {
    "resources": [
      {
        "title": "Read the ART enzyme-system preprint",
        "url": "https://www.biorxiv.org/content/10.64898/2026.10.05.755809v1",
        "type": "Paper",
        "note": "The research preprint linked by Anthropic; the system's function remains under investigation."
      }
    ]
  },
  "iris-signaling": {
    "resources": [
      {
        "title": "IRIS signaling-inference code",
        "url": "https://github.com/Pulin-Li-Lab/IRIS-signaling-inference",
        "type": "Code",
        "note": "The research implementation linked in the Nature Methods paper."
      }
    ]
  },
  "epipred-stxbp1": {
    "resources": [
      {
        "title": "EpiPred research code",
        "url": "https://github.com/carvill-lab/STXBP1-epiPred",
        "type": "Code",
        "note": "The Carvill Lab repository identified in the paper's data-availability statement."
      },
      {
        "title": "Read the EpiPred paper PDF",
        "url": "https://www.jci.org/articles/view/207160/pdf",
        "type": "Paper",
        "note": "Full journal article describing model development and laboratory checks."
      }
    ]
  },
  "mit-crystal-narratives": {
    "resources": [
      {
        "title": "Read the crystal structure–text study",
        "url": "https://www.nature.com/articles/s41467-026-76378-7",
        "type": "Paper",
        "note": "Nature Communications paper linked by the MIT research report."
      }
    ]
  },
  "designed-proteases": {
    "resources": [
      {
        "title": "Cysteine-protease design pipeline",
        "url": "https://github.com/hojaec/RFD2_MI_cysteine_protease_pipeline",
        "type": "Code",
        "note": "Computational design pipeline released with the Nature study."
      }
    ]
  },
  "scorpion-binders": {
    "resources": [
      {
        "title": "Read the scorpion-binder technical report",
        "url": "https://www-cdn.anthropic.com/31ac578806cffd8b3d92d8affe6edc4c04d502e1.pdf",
        "type": "Paper",
        "note": "Full developer report (PDF) describing the campaign and binding assays."
      },
      {
        "title": "Explore the released designs and assay data",
        "url": "https://huggingface.co/datasets/Anthropic/scorpion-toxin-binder-design",
        "type": "Dataset",
        "note": "The 211 tested designs and their released data; binding is not neutralization."
      }
    ]
  },
  "maestro-prostate": {
    "resources": [
      {
        "title": "Read the MAESTRO laboratory study",
        "url": "https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.78186",
        "type": "Paper",
        "note": "Advanced Science paper on drug combinations in prostate-cancer cell models."
      }
    ]
  },
  "pinal-text-protein": {
    "resources": [
      {
        "title": "Pinal model implementation",
        "url": "https://github.com/westlake-repl/Denovo-Pinal",
        "type": "Code",
        "note": "Official code and instructions for text-guided protein design."
      },
      {
        "title": "Try the Pinal research server",
        "url": "https://www.denovo-pinal.com/",
        "type": "Demo",
        "note": "Online research server linked by the authors; availability may vary."
      }
    ]
  },
  "subseasonal-ml": {
    "resources": [
      {
        "title": "Advancing subseasonal forecasting with machine learning",
        "url": "https://www.nature.com/articles/s41586-026-11126-x",
        "type": "Paper",
        "note": "The full research paper behind the Nature briefing."
      }
    ]
  },
  "kls-conjecture": {
    "resources": [
      {
        "title": "Read the KLS proof preprint",
        "url": "https://arxiv.org/pdf/2610.01447v2",
        "type": "Paper",
        "note": "Song and Zhang's version linked by Microsoft Research (PDF)."
      },
      {
        "title": "Explore the KLS500 Lean formalization",
        "url": "https://github.com/HongruZhao/KLS500",
        "type": "Code",
        "note": "A separate formalization combining the key criterion with additional work."
      }
    ]
  },
  "rfd4-lenacapavir": {
    "resources": [
      {
        "title": "Explore RFD4-Proteina's visual research page",
        "url": "https://rfd4-proteina.org/",
        "type": "Research",
        "note": "Model diagrams, design trajectories, benchmarks and laboratory examples."
      },
      {
        "title": "RFD4-Proteina code",
        "url": "https://github.com/RosettaCommons/RFD4-Proteina",
        "type": "Code",
        "note": "Public implementation and documentation from Rosetta Commons."
      },
      {
        "title": "Read the RFD4-Proteina preprint",
        "url": "https://rfd4-proteina.org/assets/paper/RFD4-Proteina.pdf",
        "type": "Paper",
        "note": "Technical report on biomolecular design through latent reasoning (PDF)."
      }
    ]
  },
  "eth-disproof": {
    "resources": [
      {
        "title": "Read OpenAI's ETH argument",
        "url": "https://github.com/openai/math/blob/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026/paper.pdf",
        "type": "Paper",
        "note": "A second team's publicly released argument for examination."
      },
      {
        "title": "Inspect OpenAI's ETH formalization guide",
        "url": "https://github.com/openai/math/blob/main/lean/docs/378.md",
        "type": "Code",
        "note": "Documentation for the associated Lean proof artifacts."
      }
    ]
  },
  "local-smoothing": {
    "resources": [
      {
        "title": "Read the local-smoothing argument",
        "url": "https://github.com/openai/math/blob/main/preprints/Local-smoothing-for-the-Euclidean-wave-equation-October-25-2026/paper.pdf",
        "type": "Paper",
        "note": "Publicly released AI-produced proof manuscript (PDF)."
      },
      {
        "title": "Inspect the local-smoothing formalization guide",
        "url": "https://github.com/openai/math/blob/main/lean/docs/079.md",
        "type": "Code",
        "note": "Documentation for checking the associated Lean artifacts."
      }
    ]
  },
  "yang-mills-existence": {
    "resources": [
      {
        "title": "Understand the original Yang–Mills problem",
        "url": "https://www.claymath.org/wp-content/uploads/2022/06/yangmills.pdf",
        "type": "Background",
        "note": "Jaffe and Witten's official problem statement (PDF), not the announced proof."
      }
    ],
    "coverageNote": "The announced proof is not publicly available; this resource explains the underlying problem."
  }
};

// Videos linked or embedded by the research publishers. Labels describe their context; upload dates are omitted when unconfirmed.
const RESOURCE_VIDEOS = {
  "alphagenome-atlas": {
    "videoId": "U0aToL5C-bQ",
    "title": "AlphaGenome Atlas: Understanding the human genome",
    "publisher": "Google DeepMind",
    "type": "Official explainer",
    "caption": "See how predicted DNA-variant effects become a resource researchers can explore.",
    "note": "Computational predictions for research; not clinical validation."
  },
  "antigravity-peptide": {
    "videoId": "JDyatKs10Kk",
    "title": "Accelerating antimicrobial peptide discovery with Google Antigravity",
    "publisher": "Google DeepMind",
    "type": "Official demonstration",
    "caption": "Follow a researcher and an agent through a computational peptide investigation.",
    "note": "Demonstrates a candidate-search workflow, not an experimentally proven treatment."
  },
  "evo2": {
    "videoId": "Q1WNmfHz5sA",
    "title": "Patrick Hsu: Evo 2 Generative Biology for Genome Design",
    "publisher": "Arc Institute",
    "type": "Researcher presentation",
    "caption": "Explore the genome model through Arc Institute’s launch video.",
    "note": "Video linked from the launch article; generated sequences require experimental validation."
  },
  "deep-think-imo": {
    "videoId": "TgS0nFeYul8",
    "title": "A conversation on AI and mathematics",
    "publisher": "Google DeepMind",
    "type": "Background conversation",
    "caption": "A broader science conversation linked by the IMO announcement.",
    "note": "Background context, not a demonstration or independent assessment of the IMO result."
  },
  "crest": {
    "videoId": "0cV5zbilK4Y",
    "title": "Nature Multimodal Supplementary Video 1",
    "publisher": "Ju Li · linked by MIT",
    "type": "Research demonstration",
    "caption": "See the research demonstration embedded in MIT’s announcement.",
    "note": "The video illustrates the workflow; consult the paper for methods and experimental results."
  },
  "melissa-forecast": {
    "videoId": "wd5ZZV8if54",
    "title": "Predicting a historic storm earlier with WeatherNext",
    "publisher": "Google DeepMind",
    "type": "Official research film",
    "caption": "Follow the forecasting story behind Hurricane Melissa.",
    "note": "A case-study film; forecast uncertainty and the published evaluation still matter."
  }
};
