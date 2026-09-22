# Explainable Credit Risk & Loan Portfolio Monitoring

A financial data science project to estimate mortgage delinquency risk, explain model predictions, and monitor risk across a loan portfolio.

> **Status: Planning / early development.** This README describes the intended scope. No trained model, performance results, or working application are claimed yet.

## Overview

Lenders need to understand which loans may experience repayment difficulties and whether their risk models remain reliable over time. This project will combine a reproducible data pipeline, interpretable baseline modelling, time-based evaluation, and a portfolio monitoring dashboard.

The emphasis is on defensible predictions: information available at the prediction date, clearly defined outcomes, realistic evaluation, and transparent limitations.

## Research question

**Using information available at loan origination, can we estimate the probability that a mortgage becomes 90 or more days delinquent within its first 12 months?**

This is a delinquency prediction task. The predicted probability will not be described as a probability of legal default or foreclosure.

Before modelling, the dataset documentation will be used to specify the observation window, reporting conventions, and treatment of prepayments, missing records, and loans with incomplete follow-up. An unobserved outcome will not automatically be labelled as successful repayment.

## Planned data source

[Freddie Mac Single-Family Loan-Level Dataset](https://www.freddiemac.com/research/datasets/sf-loanlevel-dataset)

The initial scope is a manageable subset of US mortgages, using origination characteristics as predictors and monthly performance records to construct outcomes.

- Document dataset release, selected cohorts, field definitions, and exclusions.
- Record access requirements and follow the source's applicable terms.
- Keep raw loan records outside the public repository unless redistribution is expressly permitted.
- Publish data acquisition instructions and aggregate outputs as permitted.

Results will describe the selected US mortgage population; they will not establish suitability for Indian lending or other credit products.

## Planned workflow

1. **Define the target:** establish the prediction date, 12-month horizon, eligible population, and outcome rules.
2. **Prepare the data:** join origination and performance records using SQL and Python; validate keys, dates, missingness, and duplicates.
3. **Explore the portfolio:** examine delinquency frequency, loan characteristics, and differences across origination periods.
4. **Build a baseline:** compare a constant-risk benchmark with logistic regression.
5. **Compare models:** evaluate whether gradient-boosted trees improve on the baseline.
6. **Validate predictions:** assess ranking quality, probability calibration, false alarms, and missed delinquency events.
7. **Explain and monitor:** present model explanations, portfolio risk summaries, and changes over time.

## Modelling and evaluation

### Prevent information leakage

Only predictors available at origination will be eligible. Later payment history and other post-origination outcomes will be excluded from inputs. Preprocessing will be fitted on training data only.

### Respect time

Training, validation, and test cohorts will be ordered chronologically. Outcome windows for training and model selection must have matured before the relevant simulated deployment date. The final test cohort will remain untouched during model selection.

### Measure more than accuracy

| Measure | Purpose |
| --- | --- |
| PR-AUC / average precision | Evaluate identification of relatively uncommon delinquency events; report event prevalence alongside it |
| ROC-AUC | Assess how well the model ranks higher-risk versus lower-risk loans |
| Brier score and calibration plots | Assess whether predicted probabilities agree with observed outcomes |
| Precision and recall at selected thresholds | Show the trade-off between false alerts and missed events |
| Results by period and relevant loan segment | Identify weaknesses hidden by portfolio averages |

Any threshold-based review policy will be labelled as a research simulation. Costs or review-capacity assumptions will be explicit, not presented as observed business savings.

## Explainability and monitoring

Planned outputs include:

- Logistic regression coefficients and their modelling assumptions.
- Feature contribution explanations for the tree model, using SHAP if appropriate.
- Portfolio summaries by predicted risk band.
- Comparisons of input distributions and predicted risk across periods.
- Calibration and discrimination monitoring once the required repayment outcomes become observable.

Feature contributions describe model behaviour; they do not establish causal explanations. Changes in input distributions alone do not prove that model performance has deteriorated.

## Proposed technology stack

| Component | Proposed tools |
| --- | --- |
| Data preparation | Python, pandas, SQL, DuckDB |
| Baseline and evaluation | scikit-learn |
| Tree model | XGBoost |
| Model explanations | SHAP |
| Dashboard | Streamlit, Plotly |
| Data and calculation checks | pytest |

Tools will be added when required by an implemented feature.

## Roadmap

- [ ] Confirm dataset access and document the selected sample.
- [ ] Finalise outcome definitions and follow-up rules.
- [ ] Build and validate the SQL/Python data pipeline.
- [ ] Complete exploratory analysis and leakage review.
- [ ] Establish chronological training, validation, and test cohorts.
- [ ] Train and evaluate baseline models.
- [ ] Compare a boosted-tree model and assess calibration.
- [ ] Add explanations and error analysis.
- [ ] Build portfolio monitoring views.
- [ ] Publish reproducible setup instructions and an evaluation report.

## Results

No model results are available yet. The evaluation report will include sample sizes, cohort dates, outcome prevalence, baseline comparisons, uncertainty estimates, and limitations. Reported metrics will come from executed experiments, not illustrative values.

## Getting started

Implementation and dependency setup are pending. Installation, data preparation, training, and dashboard commands will be added after they have been implemented and verified.

## Limitations and intended use

This is an educational research project, not a production underwriting or automated loan approval system. Historical performance may not generalise to future periods or populations outside the selected dataset. Predictive performance alone does not demonstrate fairness or regulatory compliance.

The project aims to demonstrate financial data preparation, statistical reasoning, reproducible machine learning, and clear communication of model risk.
