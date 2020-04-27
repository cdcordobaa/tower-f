import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.scss";

import { RepoSearchForm } from "./containers/RepoSearch/RepoSearchForm";
import { IssuesListPage } from "./containers/IssuesList/IssuesListPage";
import { IssueDetailsPage } from "./containers/IssueDetails/IssueDetailsPage";

import { displayRepo, setCurrentDisplayType, setCurrentPage } from "./containers/IssuesDisplay/issuesDisplay";

import { CompanyFit } from "./containers/UserCompanyFit/CompanyFitContainer";

import { RootState } from "./store";

const App: React.FC = () => {
    const dispatch = useDispatch();

    const { org, repo, displayType, page, issueId } = useSelector((state: RootState) => state.issuesDisplay);

    const setOrgAndRepo = (org: string, repo: string) => {
        dispatch(displayRepo({ org, repo }));
    };

    const setJumpToPage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const showIssuesList = () => {
        dispatch(setCurrentDisplayType({ displayType: "issues" }));
    };

    const showIssueComments = (issueId: number) => {
        dispatch(setCurrentDisplayType({ displayType: "comments", issueId }));
    };

    let content;

    if (displayType === "issues") {
        content = (
            <React.Fragment>
                <RepoSearchForm org={org} repo={repo} setOrgAndRepo={setOrgAndRepo} setJumpToPage={setJumpToPage} />
                <IssuesListPage
                    org={org}
                    repo={repo}
                    page={page}
                    setJumpToPage={setJumpToPage}
                    showIssueComments={showIssueComments}
                />
            </React.Fragment>
        );
    } else {
        const key = `${org}/${repo}/${issueId}`;
        content = (
            <IssueDetailsPage key={key} org={org} repo={repo} issueId={issueId} showIssuesList={showIssuesList} />
        );
    }

    let torreUserUi = (
        <React.Fragment>
            <CompanyFit data="im teling you" />
            {/* {content} */}
        </React.Fragment>
    );
    return <div className="App">{torreUserUi}</div>;
};

export default App;
